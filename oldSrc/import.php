<?PHP
$path = '';

require_once("functions/basic_html_functions.php");
require_once("../config.php");
require_once("functions/database_functions.php");
require_once("functions/generalized_functions.php");
require_once("functions/import_functions.php");
require_once("functions/tables.php");

$page = isset($_GET["page"])?$_GET["page"]:"export";
$tables = getTableNameDict();
if(!isset($_SESSION))
    session_start();

if(isset($_POST)) {
    //If the user has requested an export, generate a csv file in the export folder and make them download it
    if(isset($_POST["tableSelect"]) && array_key_exists($_POST["tableSelect"], $tables)){
        $filePath = exportToCSV($_POST["tableSelect"]);
        if($filePath != NULL)
            header("location:download.php?path=".$filePath);  //Start actual download
        exit;
    }

    //Data import
    if(isset($_POST["availableRecords"])) {
        completeImport($_POST, $_SESSION['filepath']);
    }
}
//Headers
require("includes/header.php");
display_small_page_heading("Data Exporter");

//Page navigation
echo '<h4><div style="margin-top:5px;margin-bottom:45px;">';
echo '<a href="import.php?page=export"'.($page == "export" ? ' class="selected"' : '').'>Export</a>';
echo ' | ';
echo '<a href="import.php?page=import"'.($page == "import" ? ' class="selected"' : '').'>Import</a>';
echo '<div></h4>';

switch($page) {
    case "export":
        echo "<p>Select which table to download from:</p>";
        echo "<form id='tableForm' method='POST' action='import.php'>";
        echo "<select id='tableSelect' name='tableSelect'>";

        foreach($tables as $tableName => $displayName) {
        echo "<option value='".$tableName."'>".$displayName."</option>";
        }
        unset($displayName);
        echo "</select>";
        echo "<input style='margin-left: 2em;' type='submit' value='Download'>";
        echo "</form>";
        echo "<p><i>Please note that the exporting process may take some time.</i></p>";
        break;
    case "import":
        if(isset($_GET['filepath'])) {
            if(dirname($_GET['filepath']) == 'upload') {
                $_SESSION['filepath'] = $_GET['filepath'];
                display_import_form($_GET['filepath']);
            }
        }
        else {
            //Form that uploads the file to the uploads directory with some help from upload.php
            echo '<i>Please upload a <u>CSV</u> file below</i>';
            echo '<form action="upload.php?redirect=import.php" method="post" enctype="multipart/form-data">
                <input type="file" id="csv_file" name="csv_file" accept=".csv"><BR/>
                <input type="hidden" name="file_upload" value="yes">
                <input type="submit">
                </form>';
        }
        break;
}


require("includes/footer.php");
?>