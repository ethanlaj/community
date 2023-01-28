<?PHP
//This file contains the functions to export data from the database to a CSV file
//However, the majority of the functions are for the much more complicated import feature.
//The import involves uploading a CSV file, displaying a very configurable import form, and constructing and running the custom queries that modify the database
//The import form relies heavily on the javascript in js/import.js to dynamically adjust according to the user's input
require_once("functions/tables.php");
function exportToCSV($tableName) {
    //Get data from database
    $table = getTable($tableName);
    if($table == NULL) {
        return NULL;
    }
    $data = $table->get_all_records_from_db();
    
    //Create csv file and write to it
    if (!file_exists('export')) {
        mkdir('export', 0777, true);
    }

    $tables = getTableNameDict();
    $filePath = 'export/'.$tables[$table->name].'.csv';

    $fp = fopen($filePath, 'w');
    if($fp == NULL) {
        echo 'Error: Failed to create new csv file. Please try again.';
        return NULL;
    }
    $dispNames = [];
    $fkTables = [];
    foreach($table->columns as $column) {
        if(!$column->pk)
            $dispNames[] = $column->dispName;
        if($column->fk) {
            $fkTables[$column->name] = $table->getFKTable($column->name);
        }
    }

    fputcsv($fp, $dispNames);
    foreach ($data as $tableRow) {
        $row = [];
        foreach($table->columns as $column) {
            if($column->pk)
                continue;

            $type = $column->datatype;

            if(!isset($tableRow[$column->name]) && substr_compare($type, "TINYINT",0,7,true) !== 0) {
                $row[] = "";
                continue;
            }
            if($column->fk) {
                $fkTable = $fkTables[$column->name];
                $fkRecord = $fkTable->get_record($tableRow[$column->name]);
                if(!is_array($fkRecord)) {
                    $row[] = "";
                    continue;
                }

                $dc = $fkTable->dispColumns;
                $dispName = "";
                for($i=0; $i <  count($dc); $i++) {
                    if($i !== 0) {
                        $dispName .= ' ';
                    }
                    $dispName .= $fkRecord[$dc[$i]];
                }
                
                //TODO LINK FKs
                $row[] = $dispName;
                continue;
            }

            // Check data type to see if the output must be modified to be human-readable
            if(substr_compare($type, "DATE",0,4,true) == 0) {
                $row[] = date('m/d/Y', strtotime($tableRow[$column->name]));
            }
            else if(substr_compare($type, "TIME",0,4,true) == 0) {
                $row[] = date('g:iA', strtotime($tableRow[$column->name]));
            }
            else if(substr_compare($type, "TINYINT",0,7,true) == 0) {
                $row[] = $tableRow[$column->name] == 1 ? "YES" : "NO";
            }
            else { 
                $row[] = $tableRow[$column->name];
            }
        }
        fputcsv($fp, $row);
    }
    unset($fields);
    fclose($fp);
    return $filePath;
}

//Displays a reactive form that allows the user to import a csv file
function display_import_form($filePath) {
    $regex = "/(<([^>]+)>)/i";
    $fp = fopen($filePath,'r');
    if($fp == null) {
        die('Error: Failed to open file');
    }
    $csv_columns = fgetcsv($fp);

    $tableNames = getTableNameDict();
    $tables = [];
    foreach($tableNames as $key => $value) {
        $tables[$key] = getTable($key);
    }
    
    echo '<script>';
    echo 'let tableNames = '.json_encode($tableNames, JSON_HEX_TAG).';';
    echo 'let tables = '.json_encode($tables, JSON_HEX_TAG).';';
    echo 'let csvColumns = '.json_encode($csv_columns, JSON_HEX_TAG).';';
    echo '</script>';
    echo '<script src="js/import.js"></script>';

    echo '<form method="POST" action="import.php">';
    echo '<h2>Configure CSV Import</h2>';
    //Configuration for database records
    echo '<table id="recordSelection">';
    echo '<tr><th>Database Record Selection</th></tr>';
    echo '<tr><td><button form="" id="addTable">Add Option</button></td></tr>';
    echo '</table><BR/>';

    //Table for CSV columns
    echo '<table style="width: 50px;">';
    echo '<tr><th>CSV Column</th><th>Database Column</th></tr>';
    
    for($i = 0; $i < count($csv_columns); $i++) {
        echo '<tr>';
        echo '<td style="border: 2px solid black;">'.preg_replace($regex, "", $csv_columns[$i]).'</td>';
        echo '<td style="border: 2px solid black;">Table: <select class="chooseTable" id="chooseTable'.$i.'" name="chooseTable'.$i.'"><option></option></select><BR/>Column: <select class="chooseColumn" id="chooseColumn'.$i.'" name="chooseColumn'.$i.'"><option></option></select></td>';
        echo '</tr>';
    }
    echo '</table>';
    echo '<input type="hidden" id="availableRecords" name="availableRecords" value={}>';
    echo '<input type="submit" value="Confirm Import">';
    echo '</form>';
    fclose($fp);
}

// Performs the final steps of the import including checking input and modifying the database
// Uses availRecs to determine how many/what types of queries must be made
// Uses chooseTableX and chooseColumnX variables to determine what data gets mapped to what
function completeImport($postData, $filePath) {
    $pdo = connect_to_db();
    $mapping = [];
    $datatypes = [];
    $availRecs = json_decode($postData["availableRecords"], true);
    $fp = fopen($filePath,'r');
    $numCols = count(fgetcsv($fp));
    $tableNameDict = getTableNameDict();
    $tables = [];
    foreach($tableNameDict as $tableName => $unusedVal) {
        $tables[$tableName] = getTable($tableName);
    }
    unset($tableName, $unusedVal);

    //Craft sql queries that will only be missing bound variables
    $queries = [];
    foreach($availRecs as $tableName => $options) {
        //Craft basic query structure accoring to "recordOptionX"
        //create - insert statement
        //update - update statement
        //createupdate - select to check existence, then create or update
        
        //Step 1: identify record mode
        $recordMode = $options["recordMode"];

        $selectSql1 = "SELECT 1";
        $selectSql2 = " FROM $tableName ";
        $selectSql4 = " LIMIT 1;";

        $updateSql1 = "UPDATE $tableName SET ";
        $updateSql2 = " WHERE ";

        $insertSql1 = "INSERT INTO ".$tableName." (";
        $insertSql2 = ") VALUES (";

        $first = true;

        //Construct WHERE clause based on constraints
        if($recordMode != "create") {
            //If there are no constraints, prevent a rogue query from modifying random records
            if(count($options) == 1) {
                $updateSql2 .= "FALSE";
            }
            else {
                $updateSql2 .= "TRUE";
                foreach($options as $csvColNum => $tableCol) {
                    if($csvColNum == "recordMode") {
                        continue;
                    }
                    //Prevent sql injection
                    $col = $tables[$tableName]->getColumn($tableCol);
                    if($col == NULL) {
                        echo "Error: Column name not found in table ".$tableName;
                        exit;
                    }
                    if(!is_numeric($csvColNum)) {
                        echo "Error: Number expected for CSV column number";
                        exit;
                    }
                    $datatypes[$csvColNum] = $col->datatype;

                    $updateSql2 .= " AND UPPER($tableCol) = UPPER(:col$csvColNum)";
                    addMapping($mapping, $csvColNum, $tableName);
                }
                unset($csvColNum, $tableCol);
            }
        }

        //Add columns to sql
        for($i = 0; $i < $numCols; $i++) {
            if($postData["chooseTable".$i] != $tableName || $postData["chooseColumn".$i] == "")
                continue;
            
            addMapping($mapping, $i, $tableName);
            $columnName = $postData["chooseColumn".$i];
            $col = $tables[$tableName]->getColumn($columnName);
            if($col == NULL) {
                echo "Error: Column name not found in table ".$tableName;
                exit;
            }
            $datatypes[$i] = $col->datatype;

            if($first) {
                $first = false;
            }
            else {
                $insertSql1 .= ',';
                $insertSql2 .= ',';
                $updateSql1 .= ",";
            }
            $insertSql1 .= $columnName;
            $insertSql2 .= ":col".$i;
            $updateSql1 .= "$columnName=:col$i";
            $selectSql1 .= ",:col".$i; //This line is dumb and stupid but it will prevent the stupid bound variable mismatch error
        }
        //Add sql to list of queries if there is at least one piece of data to be inserted
        if(!$first) {
            $queries[$tableName] = [];
            $queries[$tableName]['insert'] = $pdo->prepare($insertSql1.$insertSql2.");"); //echo "INSERT: ".$insertSql1.$insertSql2.");<BR/>";
            if($recordMode != "create") {
                $queries[$tableName]['update'] = $pdo->prepare($updateSql1.$updateSql2.";"); //echo "UPDATE: ".$updateSql1.$updateSql2.";<BR/>";
                $queries[$tableName]['select'] = $pdo->prepare($selectSql1.$selectSql2.$updateSql2.$selectSql4); //echo "SELECT: ".$selectSql1.$selectSql2.$updateSql2.$selectSql4."<BR/>";
            }
        }
    }
    unset($tableName, $options);
    
    //Setup prototype for bound variable lists
    $boundVarsPrototype = [];
    foreach($queries as $tableName => $queryList) {
        $boundVarsPrototype[$tableName] = [];
    }
    unset($tableName, $queryList);

    while(!feof($fp)) {
        $csvRow = fgetcsv($fp);
        if(!is_array($csvRow))
            break;
        
        $boundVars = $boundVarsPrototype;
        for($i = 0; $i < $numCols; $i++) {
            if(!isset($mapping[$i])) {
                continue;
            }
            
            foreach($mapping[$i] as $tbName) {
                $boundVars[$tbName][":col".$i] = convertData($csvRow[$i],$datatypes[$i]);
            }
            unset($tbName);
        }

        foreach($queries as $tableName => $queryList) {
            $recordMode = $availRecs[$tableName]["recordMode"];
            
            if($recordMode == "create") {
                $queryList['insert']->execute($boundVars[$tableName]);
            }
            else if($recordMode == "update") {
                $queryList['update']->execute($boundVars[$tableName]);
            }
            else if($recordMode == "createupdate") {
                $queryList['select']->execute($boundVars[$tableName]);
                $res = $queryList['select']->fetchAll();
                
                if(is_array($res) && count($res) > 0) {
                    $queryList['update']->execute($boundVars[$tableName]);
                }
                else {
                    $queryList['insert']->execute($boundVars[$tableName]);
                }
            }
        }
        unset($tableName, $queryList);
    }
}
//Function that converts human-readable data to database-friendly data
function convertData($data, $type) {
    if(substr_compare($type, "DATE",0,4,true) == 0) {
        //Find and don't mess with dates in the correct format
        $regex = "/[0-9]{4}-[0-9]{2}-[0-9]{2}/";
        if(preg_match($regex, $data)) {
            return $data;
        }
        // Needs to convert format mm/dd/yyyy to yyyy-mm-dd
        $mm = strstr($data, '/',true);
        $ddyyyy = substr($data, strpos($data, "/")+1);
        $dd = strstr($ddyyyy, '/',true);
        $yyyy = substr(strstr($ddyyyy, '/'), 1);
        return $yyyy."-".$mm."-".$dd;
    }
    else if(substr_compare($type, "TINYINT",0,7,true) == 0) {
        return substr_compare($data,"YES",0,3,true) || ((int)$data) == 1;
    }
    return $data;
}
//Adds a mapping from a column number to a table. A colnum may map to multiple tables
//This mapping is used to set up the parameterized queries
function addMapping(&$mappingArr, $colNum, $tableName) {
    if(!isset($mappingArr[$colNum])) {
        $mappingArr[$colNum] = [];
    }
    if(!in_array($tableName,$mappingArr[$colNum])) {
        $mappingArr[$colNum][] = $tableName;
    }
}
?>