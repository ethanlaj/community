<?PHP
$path = '';
require_once("functions/basic_html_functions.php");
require_once("../config.php");
require_once("functions/database_functions.php");
require_once("functions/accounts_functions.php");

require("includes/header.php");

  //page headings
  display_small_page_heading("Profile Page","");
  
  if(isset($_POST["changepassword"]) && $_POST["changepassword"] == $_SESSION['firstName']) {
    $user = authorizeUser($_SESSION['email'],$_POST['origPassword']);

    if($user != false && $_POST["newPassword1"] == $_POST["newPassword2"]) {
        changePassword($user,$_POST["newPassword1"]);
        echo "Password successfully updated";
    }
    else {
        echo "Failed to change password - could not authenticate user";
    }
  }

  $page = isset($_GET["page"])?$_GET["page"]:"view";
  if($page == "view") {
?>


<div style="height: 400px;">

<b>First Name: </b><?PHP echo $_SESSION['firstName']?><BR/><BR/>
<b>Last Name: </b><?PHP echo $_SESSION['lastName']?><BR/><BR/>
<b>Email: </b><?PHP echo $_SESSION['email']?><BR/><BR/>
<b>Permission Level: </b><?PHP echo  $_SESSION['permissionLevel']?><BR/><BR/>
<a href="profile.php?page=password"><button style="text-align: center;">Change Password</button></a>

<?PHP 
if  ($_SESSION['permissionLevel'] >= 10){
        echo '<a href="manage_accounts.php"><button style="text-align: right;">Manage Accounts</button></a>';
}
?>

</div>

<?PHP
  }
  else if($page == "password") {
    echo '<form id="changePasswordForm" method="POST" action="profile.php">';
    echo '<label for="origPassword">Old password: </label><input id="origPassword" name="origPassword" type="password"><BR/>';
    echo '<label for="newPassword1">New password: </label><input id="newPassword1" name="newPassword1" type="password"><BR/>';
    echo '<label for="newPassword2">Retype new password: </label><input id="newPassword2" name="newPassword2" type="password"><BR/>';
    echo '<input type="hidden" name="changepassword" value="'.$_SESSION['firstName'].'">';
    echo '<input id="formSubmit" type="button" value="Change Password">';
    echo '</form>';
    echo '<script src="js/samePassword.js"></script>';
  }
require("includes/footer.php");
?>
