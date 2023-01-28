<?php
//This file is the core of 8 pages of the site that connect with the database
//The Column and Table class are used to create a local representation of the database
//Other data regarding tables is stored in tables.php

//The functions below are capable of dynamically generating pages to add/edit/view records and get/store data in the database
//List of pages powered by this file: coaching.php, companies.php, contacts.php, first_destinations.php, internships.php, meetings.php, students.php, survey.php
require_once(__DIR__."/../../config.php");
require_once(__DIR__."/database_functions.php");

class Column {
    public $name;
    public $dispName;
    public $datatype;
    public $pk;
    public $fk;
    public $fkTable;
    public $searchable;
    public $options = NULL; //Possible values for this field that will appear as a dropdown
    
    public function __construct($name, $dispName, $datatype, $pk=false, $fk=false, $searchable=false) {
    	$this->name = $name;
        $this->dispName = $dispName;
        $this->datatype = $datatype;
        $this->pk = $pk;
        $this->fk = $fk;
        $this->searchable = $searchable;
    }
    
    public function getLabelStr() {
    	return '<label for="'.$this->name.'">'.$this->dispName.': </label>';
    }
}

class Table {
	public $name;
    public $fileName;
	public $columns;
    public $dispColumns; //ie name, title, etc.
    
    // Creates a table object that mirrors the table with the same name in the database
    // Requires dispNames array as more human friendly column names
    // dispColumns array is an array of all column names that are name, title, etc.
    public function __construct($tableName, $dispNames, $dispColumns) {
    	$this->name = $tableName;
        $this->columns = array();
        $this->dispColumns = $dispColumns;
        $pdo = connect_to_db();
        $data = $pdo->query("DESCRIBE ".$tableName.";")->fetchAll();
        
        $numCols = count($data);
        if($numCols != count($dispNames)) {
            echo $numCols." ".count($dispNames)."<BR/>";
            echo 'Error: tried to build '.$tableName.' table but failed due to display name / database column mismatch';
            exit;
        }

        // Get column information from database
        for($i=0; $i < $numCols; $i++) {
        	$colInfo = $data[$i];
        	$column = new Column($colInfo['Field'], $dispNames[$i], $colInfo['Type'], $colInfo['Key']=="PRI", $colInfo['Key']=="MUL", false);
            array_push($this->columns, $column);
        }
    }
    
    public function getDispName() {
    	return ucwords($this->name);
    }
	public function getPrimaryKey() {
    	foreach($this->columns as $column) {
            if($column->pk)
                return $column;
        }
    }
    public function getColumn($name) {
    	foreach($this->columns as $column) {
            if($column->name == $name)
                return $column;
        }
    }
    //Makes a select element show up with premade options
    public function addOptionsToCol($columnName, $options) {
        foreach($this->columns as $column) {
            if($column->name == $columnName) {
                $column->options = $options;
            }
        }
    }
    //Marks a column of the specified name as a foreign key for the specified table
    public function addForeignKey($columnName, $refTable) {
        $col = $this->getColumn($columnName);
        $col->fk = true;
        $col->fkTable = $refTable;
    }
    // Name: Display Form Function
    // Params:
    //  - this: Table object that represents the layout of a sql table
    //  - fileName: Name of the file to submit form to
    //  - data: Array of prior data if editing an item
    //
    // Description: Displays a form that allows the user to input all fields for a row in the specified table
    function display_form($itemName, $data=null){
        if($data == null){
            $formHTML = "<h2>Add ".$itemName."</h2>";
            $data = [];
            foreach($this->columns as $column) {
                $data[$column->name] = "";
            }
            $buttonString = "Add ".$itemName;
        }else{
            $formHTML = "<h2>Edit ".$itemName."</h2>";
            $buttonString = "Edit ".$itemName;
        }
        echo '<form method=post action='.$this->fileName.'>';
        foreach($this->columns as $column) {
            // Primary Key is a hidden value
            if($column->pk) {
                echo '<input name="'.$column->name.'" type="hidden"  value="'.$data[$column->name].'">';
                continue;
            }
            //Prepare label that shows the human-readable column name
            echo $column->getLabelStr();

            if($column->fk) {
                // Query foreign key table for values
                $fkTable = $this->getFKTable($column);
                $records = $fkTable->get_all_records_from_db();
                $pkName = $fkTable->getPrimaryKey()->name;
                
                //Generate select statement with all values from fk table
                echo '<select style="margin-right: 1em;" name="'.$column->name.'" id="'.$column->name.'">';
                echo '<option value=""></option>';
                foreach($records as $record) {
                    $selected = ($data[$column->name] == $record[$pkName]) ? " selected" : "";
                    //Display the dispColumns to represent each record as an option
                    echo '<option value="'.$record[$pkName].'"'.$selected.'>';
                    $first = true;
                    foreach($fkTable->dispColumns as $dispCol) {
                        if($first)
                            $first = false;
                        else
                            echo ' ';
                        echo $record[$dispCol];
                    }
                    echo '</option>';
                }
                echo '</select>';
                echo '<input type="search" style="margin-right:0.5em;" id="'.$column->name.'_search" placeholder="Search..." oninput="searchInput(event)" onfocus="onSearchFocus(event)" onblur="onSearchBlur(event)">';
                echo '<label for="'.$column->name.'_search" id="'.$column->name.'_matches"></label>';
                echo '<BR/>';
                continue;
            }
            // Check data type to see what html input must be used
            $type = $column->datatype;

            if(substr_compare($type, "INT",0,3,true) == 0) {
                echo '<input type="number" name="'.$column->name.'" id="'.$column->name.'" value="'.$data[$column->name].'"><BR/>';
            }
            else if(substr_compare($type, "DATE",0,4,true) == 0) {
                echo '<input type="date" name="'.$column->name.'" id="'.$column->name.'" value="'.$data[$column->name].'"><BR/>';
            }
            else if(substr_compare($type, "TIME",0,4,true) == 0) {
                echo '<input type="time" name="'.$column->name.'" id="'.$column->name.'" value="'.$data[$column->name].'"><BR/>';
            }
            else if(substr_compare($type, "TINYINT",0,7,true) == 0) {
                $checked = ($data[$column->name] == 1) ? " checked" : "";
                echo '<input type="checkbox" name="'.$column->name.'" id="'.$column->name.'" value="1"'.$checked.'><BR/>';
            }
            else if(substr_compare($type, "VARCHAR",0,7,true) == 0) { 
                $numChars = (int) (substr($type,8,strlen($type)-9));
                $rows = (int) ($numChars / 100);
                
                if($rows >= 1) {
                    echo '<BR/><textarea type="text" style="width:60%" rows="'.$rows.'" name="'.$column->name.'" id="'.$column->name.'">'.$data[$column->name].'</textarea><BR/>';
                }
                else {
                    echo '<input type="text" name="'.$column->name.'" id="'.$column->name.'" value="'.$data[$column->name].'">';
                    if($column->options != NULL) {
                        echo '<select name="'.$column->name.'_select" id="'.$column->name.'_select" class="fillSelect">';
                        echo '<option value="">--Select--</option>';
                        foreach($column->options as $option) {
                            echo '<option value="'.$option.'">'.$option.'</option>';
                        }
                        echo '</select>';
                    }
                    echo '<BR/>';
                }
            }
            else {
                echo "Type ".$type." not recognized<BR/>";
            }
        }
        echo '<input name="page" type="hidden" value="save">
            <input type="submit" value="'.$buttonString.'">
        </form>';
    }
    // Display Links to Add and Search pages
    function display_page_navigation($itemName, $currentPage){
        $navHTML  = '<h4><div style="margin-top:5px;margin-bottom:45px;">';
        $navHTML .= '<a href="'.$this->fileName.'?page=search"'.($currentPage == "search" ? ' class="selected"' : '').'>Search</a>';
        $navHTML .= ' | ';
        $navHTML .= '<a href="'.$this->fileName.'?page=add"'.($currentPage == "add" ? ' class="selected"' : '').'>Add '.$itemName.'</a>';
        $navHTML .= ' <div> </h4>';
        
        echo $navHTML;
    }
    // Display a text box for searching
    function display_search_form($itemName){
        echo '<h2>Search for a '.$itemName.'</h2><form method=get action="'.$this->fileName.'">
            <label for="search">Enter Search text:</label> <input id="name" name="search" type="text" autofocus>
            <input name="page" type="hidden" value="search">
            <input type="submit" value="Search">
        </form><br/><br/>';
    }

    // Get all records in the provided table
    function get_all_records_from_db($order="ASC"){
        $pdo = connect_to_db();
        $dc = $this->dispColumns;
        $sql = "SELECT * FROM ".$this->name." ORDER BY " .$dc[count($dc)-1]." ".$order;
        for($i=count($dc)-2; $i >= 0; $i--) {
            $sql .= ",".$dc[$i]." ".$order;
        }
        $data = $pdo->query($sql.";")->fetchAll();
        return $data;
    }

    // Get the one record with the specified id
    function get_record($id){
        $pdo = connect_to_db();
        $stmt = $pdo->prepare("SELECT * FROM ".$this->name." WHERE ".$this->getPrimaryKey()->name."=:id");
        $stmt->execute([':id' => $id]); 
        $record = $stmt->fetch(PDO::FETCH_ASSOC);
    
        return $record;
    }

    // Searches for records with display columns(name, title) that match $word
    function get_records_by_dispCols($word,$order="ASC"){
        if($word==""){
            return $this->get_all_records_from_db($order);
        }
        $sql = "";
        $dc = $this->dispColumns;
        if(count($this->dispColumns) == 1) {
            $sql = "SELECT * FROM ".$this->name." WHERE ".$dc[0]." LIKE :word ORDER BY ".$this->dispColumns[0]." ".$order.";";
        }
        else {
            $sqlpt1 = "SELECT * FROM ".$this->name." WHERE concat(".$this->dispColumns[0];
            $sqlpt2 = ") LIKE :word ORDER BY ".$dc[count($dc)-1]." ".$order;
            for($i=1; $i <  count($dc); $i++) {
                $sqlpt1 .= ", ' ', ".$dc[$i];
                $sqlpt2 .= ",".$dc[count($dc)-1-$i]." ".$order;
            }
            $sql = $sqlpt1.$sqlpt2.";";
        }
        
        $pdo = connect_to_db();
        $stmt = $pdo->prepare($sql);
        $stmt->execute([':word' => "%".$word."%"]);
        $data = [];
        while($record =  $stmt->fetch(PDO::FETCH_ASSOC)){
            $data[] = $record;
        } 
        
        return $data;
    }    

    // Displays a list of records that link to the page for that record
    function display_record_list($data=null){
        if(!is_array($data) || sizeof($data) == 0){
            echo "No matching records found";
            return;
        }
        foreach ($data as $row) {
            echo "<a href='".$this->fileName."?page=display&id=".$row[$this->getPrimaryKey()->name]."'>";
            $dc = $this->dispColumns;
            $dispName = "";
            for($i=0; $i <  count($dc); $i++) {
                if($i !== 0) {
                    $dispName .= ' ';
                }
                //Display foreign keys using their display columns instead of displaying ids
                $column = $this->getColumn($dc[$i]);
                if($column->fk) {
                    if($row[$column->name] == null || $row[$column->name] == "") {
                        continue;
                    }
                    $fkTable = $this->getFKTable($column);
                    $fkRecord = $fkTable->get_record($row[$column->name]);
                    if(!is_array($fkRecord)) {
                        echo "DELETED";
                        continue;
                    }
                    $pkName = $fkTable->getPrimaryKey()->name;

                    $len = count($fkTable->dispColumns);
                    for($j=0; $j < $len; $j++) {
                        if($j != 0)
                            echo ' ';
                        echo $fkRecord[$fkTable->dispColumns[$j]];
                    }
                }
                else {
                    $dispName .= $row[$dc[$i]];
                }
            }
            if(trim($dispName) == "")
                echo "Unnamed<BR/>";
            else
                echo $dispName."<BR/>";
            echo "</a>";
        }
    }

    // Displays all fields for one record in a human-readable way
    function display_record_info($record) {
        if(!is_array($record)) {
            echo $this->getDispName()." Information not found";
            return;
        }
        foreach($this->columns as $column) {
            //User doesn't need to see the id number
            if($column->pk)
                continue;
                
            else if($column->fk) {
                echo "<h4><b>".$column->dispName.":</b> ";
                if($record[$column->name] == null || $record[$column->name] == "") {
                    continue;
                }
                $fkTable = $this->getFKTable($column);
                $fkRecord = $fkTable->get_record($record[$column->name]);
                if(!is_array($fkRecord)) {
                    echo "DELETED";
                    continue;
                }
                $pkName = $fkTable->getPrimaryKey()->name;

                echo '<a href="'.$fkTable->fileName.'?page=display&id='.$record[$column->name].'">';
                $first = true;
                foreach($fkTable->dispColumns as $dispCol) {
                    if($first)
                        $first = false;
                    else
                        echo ' ';
                    echo $fkRecord[$dispCol];
                }
                echo "</a></h4>";
                continue;
            }
            //Make sure first and last name display together if they exist
            else if($column->name == 'firstName' && array_key_exists('lastName', $record)) {
                echo "<h4><b>Name:</b> ".$record['firstName']." ".$record['lastName']."</h4>";
                continue;
            }
            else if($column->name == 'lastName' && array_key_exists('firstName', $record)) {
                continue;
            }
            //Display column info with formatting depending on data type
            else {
                if(substr_compare($column->datatype, "TINYINT",0,7,true) == 0) {
                    echo "<h4><b>".$column->dispName.":</b> ".($record[$column->name] ? "YES" : "NO")."</h4>";
                }
                else if(substr_compare($column->datatype, "DATE",0,4,true) == 0) {
                    echo "<h4><b>".$column->dispName.":</b> ".($record[$column->name] != '0000-00-00' ? date('m/d/Y', strtotime($record[$column->name])) : '' )."</h4>";
                }
                else if(substr_compare($column->datatype, "TIME",0,4,true) == 0) {
                    echo "<h4><b>".$column->dispName.":</b> ".date('g:iA', strtotime($record[$column->name]))."</h4>";
                }
                else {
                    echo "<h4><b>".$column->dispName.":</b> ".$record[$column->name]."</h4>";
                }
            }
        }
        echo "<a href='".$this->fileName."?page=edit&id=".$record[$this->getPrimaryKey()->name]."'>Edit Info</a>";
        echo "<div id='deleteDiv' style='display: inline;'>";
        //echo "<form id='deleteForm' name='deleteForm' style='display: inline;'></form>";  //Will be put here to allow submitting after the user clicks to confirm
        echo "<button type='submit' id='delete' form='deleteForm' formaction='".$this->fileName."' formmethod='post' name='delete' value='".$record[$this->getPrimaryKey()->name]."' onclick='confirmDelete(event)'>Delete record</button>";
        echo "</div><BR/>";
    }


    // Name: Update Database
    // Params:
    //  - this: Table object that represents the layout of a sql table
    //  - fileName: Name of the file to redirect to
    //  - data: Array of data to send to database
    //
    // Description:
    // 	Updates an existing record or adds a record to the database
    // 	Redirects to a page displaying the record afterwards
    function updateDatabase($data,$redirectURL="") {
        $regex = "/(<([^>]+)>)/i";
        $pdo = connect_to_db();
        $id = $data[$this->getPrimaryKey()->name];
        
        if($id == "") { //Add
            $stmtpt1 = "INSERT INTO ".$this->name." (";
            $stmtpt2 = ") VALUES (";
            $boundParams = [];
            $firstNoComma = true;
            foreach($this->columns as $column) {
                if($column->pk)
                    continue;
                if(($column->fk || substr_compare($column->datatype, "INT",0,3,true) == 0) && $data[$column->name] == "")
                    continue;
                
                if($firstNoComma) {
                    $firstNoComma = false;
                } else {
                    $stmtpt1 .= ",";
                    $stmtpt2 .= ",";
                }
                $name = $column->name;
                $stmtpt1 .= $name;
                $stmtpt2 .= ":" . $name;
                $boundParams[$name] = ($data[$name] !== NULL) ? preg_replace($regex, "", $data[$name]) : NULL;
            }
            $stmt = $pdo->prepare($stmtpt1.$stmtpt2.");");
            $stmt->execute($boundParams);
            $id = $pdo->lastInsertId();
            if($redirectURL == "") {
                header("location:".$this->fileName."?page=display&id=".$id."&message=".$this->getDispName()." Added");
            }
            else {
                header("location:".$redirectURL);
            }
        } 
        else { //Edit
            $regex = "/(<([^>]+)>)/i";
            $stmtpt1 = "UPDATE ".$this->name." SET ";
            $stmtpt2 = " WHERE ";
            $boundParams = [];
            $firstNoComma = true;
            foreach($this->columns as $column) {
                $name = $column->name;
                if(!isset($data[$name]))
                    $data[$name] = NULL;

                if($data[$name] == "" && ($column->fk || substr_compare($column->datatype, "INT",0,3,true) == 0)) {
                    $data[$name] = NULL;
                } else if($data[$name] !== NULL) {
                    echo preg_replace($regex, "", $data[$name]);
                    $boundParams[$name] = preg_replace($regex, "", $data[$name]);
                }

                if($column->pk) {
                    $stmtpt2 .= $name."=:".$name;
                    continue;
                }
                
                if($firstNoComma) {
                    $firstNoComma = false;
                } else {
                    $stmtpt1 .= ",";
                }

                if($data[$name] === NULL) {
                    $stmtpt1 .= $name."=NULL";
                } else {
                    $stmtpt1 .= $name."=:".$name;
                }
            }
            /*echo $stmtpt1.$stmtpt2.";";
            var_dump($boundParams);
            exit;*/
            $stmt = $pdo->prepare($stmtpt1.$stmtpt2.";");
            $stmt->execute($boundParams);
            header("location:".$this->fileName."?page=display&id=".$id."&message=".$this->getDispName()." Updated");
        }
    }

    function deleteRecord($id) {
        $pdo = connect_to_db();
        $stmt = $pdo->prepare("DELETE FROM ".$this->name." WHERE ".$this->getPrimaryKey()->name." = :id;");
        $stmt->execute([':id' => $id]);
    }

    function getFKTable($fkColumn) {
        // Database no longer contains FK constraints to prevent errors when deleting
        // As such, foreign key data is now configured in tables.php

        /*global $database;
        $pdo = connect_to_db();
        $sql = 'SELECT REFERENCED_TABLE_NAME';
        $sql .= ' FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE';
        $sql .= ' WHERE';
        $sql .= " TABLE_SCHEMA = :database AND";
        $sql .= " TABLE_NAME = :tablename AND";
        $sql .= " COLUMN_NAME = :fkcolumn;";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([':database' => $database, ':tablename' => $this->name, ':fkcolumn' => $fkColumn->name]);
        $record = $stmt->fetch(PDO::FETCH_ASSOC);*/

        require_once('tables.php');
        return getTable($fkColumn->fkTable);
    }
}
?>