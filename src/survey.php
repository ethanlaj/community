<?PHP
// This page is one of 8 pages dynamically generated using functions/generalized_functions.php
$path = '';
require_once("functions/basic_html_functions.php");
require_once("functions/database_functions.php");
require_once("functions/survey_functions.php");
require_once("../config.php");
require_once("functions/generalized_functions.php");
require_once("functions/tables.php");

$table = getTable('survey');
$heading = "Survey";
$itemName = "Survey";


$page = isset($_GET["page"])?$_GET["page"]:"search";
//If a form post lead the user here, we process the posted data in a function
if(isset($_POST)) {
  if(isset($_POST["page"]) && $_POST["page"]=="save"){
    $table = getTable('survey');
    $table->fileName = "survey.php";

    //Convert arrays of chosen items to comma separated list
    if(isset($_POST["implode"])) {
        $itemsToImplode = ["advisor","summerAdvisor","reason","summerReason"];
        foreach($itemsToImplode as $arrName) {
        if(isset($_POST[$arrName]))
            $_POST[$arrName] = implode(", ",$_POST[$arrName]);
        }

        //Add submit time to form data
        $date = new DateTime("now", new DateTimeZone('America/New_York') );
        $_POST["submitDate"] = $date->format('[Y-m-d H:i]');
    }
  
    $table->updateDatabase($_POST,"student_survey.php?page=thankyou");
    exit;
  }
  //Delete a record if requested
  else if(isset($_POST["delete"])) {
    $table->deleteRecord($_POST["delete"]);
    header("location:".$table->fileName);
    exit;
  }
}
require("includes/header.php");

?>

 <!-- Header -->
 <div class="w3-container" style="margin-top:80px" id="showcase">
    <h1 class="w3-jumbo"><b></b></h1>
    <h1 class="w3-xxxlarge w3-text- blue"><b>Student Survey</b></h1>
    <hr style="width:50px;border:5px solid blue" class="w3-round">
  </div>

<?php
display_survey_page_navigation($page);



switch($page){
  case "search":
    $string = isset($_GET["search"])?$_GET["search"]:"";
    $records = $table->get_records_by_dispCols($string, "DESC");
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
  case "fall":
    echo "<b>This is a copy of the fall student survey, please send the url below to students<BR/></b>";
    $url = getHTTPStr().$_SERVER['SERVER_NAME'].substr($_SERVER['SCRIPT_NAME'],0,-(strlen("survey.php")))."student_survey.php?page=fall";
    echo "<a id='surveyLink' href='$url'>$url</a>";
    echo "<button style='margin-left: 1em;' id='copyLinkButton'>Copy Link</button><BR/><BR/>";
    echo "<script src='js/copyLink.js'></script>";
    student_survey_form();
    break;
  case "spring":
    echo "<b>This is a copy of the spring student survey, please send the url below to students<BR/></b>";
    $url = getHTTPStr().$_SERVER['SERVER_NAME'].substr($_SERVER['SCRIPT_NAME'],0,-(strlen("survey.php")))."student_survey.php?page=spring";
    echo "<a id='surveyLink' href='$url'>$url</a>";
    echo "<button style='margin-left: 1em;' id='copyLinkButton'>Copy Link</button><BR/><BR/>";
    echo "<script src='js/copyLink.js'></script>";
    student_survey_form();
    summer_survey_form();
    break;
}

//Returns https:// if port 443 is being used, http:// otherwise
function getHTTPStr() {
  return (isset($_SERVER["SERVER_PORT"]) && $_SERVER["SERVER_PORT"] == 443) ? "https://" : "http://";
}


require("includes/footer.php");
