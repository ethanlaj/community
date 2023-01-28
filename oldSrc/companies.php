<?PHP
// This page is one of 8 pages dynamically generated using functions/generalized_functions.php
$path = '';
require_once("functions/basic_html_functions.php");
require_once("../config.php");
require_once("functions/database_functions.php");
require_once("functions/generalized_functions.php");
require_once("functions/tables.php");

$table = getTable('company');
$heading = "Industry Partners";
$itemName = "Industry Partner";

//Sets the page value for display
$page = isset($_GET["page"])?$_GET["page"]:"search";
//If a form post lead the user here, we process the posted data in a function
if(isset($_POST)) {
  if(isset($_POST["page"]) && $_POST["page"]=="save"){
    $table->updateDatabase($_POST);
    exit;
  }
  //Delete a record if requested
  else if(isset($_POST["delete"])) {
    $table->deleteRecord($_POST["delete"]);
    header("location:".$table->fileName);
    exit;
  }
}
//otherwise we display the page
require("includes/header.php");

  //page headings
  display_small_page_heading($heading,"");

  $table->display_page_navigation($itemName,$page);
 
//Display appropriate page based on the $page var
  switch($page){
    case "search":
      $string = isset($_GET["search"])?$_GET["search"]:"";
      $records = $table->get_records_by_dispCols($string);
      $table->display_search_form($itemName);
      $table->display_record_list($records);
      break;
    case "add":
      $table->display_form($itemName);
      break;
    case "edit":
      $id = isset($_GET["id"])?$_GET["id"]:"";
      $record = $table->get_record($id);
      $table->display_form($itemName, $record);
      break;
    case "display":
      $id = isset($_GET["id"])?$_GET["id"]:"";
      $record = $table->get_record($id);
      $table->display_record_info($record);
      break;

  }
  

require("includes/footer.php");
