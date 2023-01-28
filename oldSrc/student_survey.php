<?PHP
// NOTE: This page is visible regardless of whether you are logged in or not since students need to access this page to submit their survey
// Be very careful with what is put on this page
?>
<!DOCTYPE html>
<html lang="en">
<head>
<title>ECMS Survey</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins|Oswald">
<link rel ="stylesheet" href="css/style.css">
</head>
<body style='background-color: #0A2240; color: white;'>
<?PHP
require_once("functions/survey_functions.php");
require_once("functions/generalized_functions.php");
require_once("functions/tables.php");

$page = isset($_GET["page"])?$_GET["page"]:"thankyou";

if(isset($_POST)) {
    if(isset($_POST["page"]) && $_POST["page"]=="save"){
        $table = getTable('survey');
        $table->fileName = "student_survey.php";

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
}
//Mobile friendly CSS since students may access this page from their phone
echo "<style>
#formDiv {
    width: 60%;
    margin-left: 20%;
    margin-top: 10%;
    margin-bottom: 10%;
    padding: 2em;
    background-color: #004B98;
}  
@media only screen and (max-width: 1000px) {
    #formDiv {
        width: 100%;
        margin: 0%;
        margin-top: 100px;
    }
}
input[type=submit] {background-color:white; color:black;}</style>";
echo "<div id='formDiv'>";


switch($page){
    case "fall":
        echo '<h1 style="font-size: 60px; border-bottom: 10px solid white; margin-bottom: 0.5em;">Fall Survey</h1>';
        student_survey_form($actionFile="student_survey.php");
        break;
    case "spring":
        echo '<h1 style="font-size: 60px; border-bottom: 10px solid white; margin-bottom: 0.5em;">Spring Survey</h1>';
        student_survey_form($actionFile="student_survey.php");
        summer_survey_form();
        break;
    case "thankyou":
    default:
        echo "<p>Thank you for submitting the survey.</p>";
        break;
}

echo "</div>";

?>
</body>
</html>