<?php
require_once("../config.php");
require_once("functions/database_functions.php");
session_start();
$messageStr = "";


//Logout functionality
if(isset($_POST['logout'])) {
    session_destroy();
    session_start();
    $messageStr = "<h5 style='margin-left: 75px; color: white;'>You have successfully signed out</h5>";
}

if(!isset($_SESSION['loggedIn'])) {
    $_SESSION['loggedIn'] = false;
}

//Login form check
if(isset($_POST['login']) && !$_SESSION['loggedIn']) {
    $username = isset($_POST['email'])?$_POST["email"]:"";
    $password = isset($_POST['password'])?$_POST["password"]:"";
    $user = authorizeUser($username,$password);
    $_SESSION["loggedIn"] = is_array($user);
    if($_SESSION['loggedIn']) {
        $_SESSION['userID'] = $user['userID'];
        $_SESSION['firstName'] = $user['firstName'];
        $_SESSION['lastName'] = $user['lastName'];
        $_SESSION['email'] = $user['email'];
        $_SESSION['permissionLevel'] = $user['permissionLevel'];
    }
    else if($username != "" || $password != "") {
        $messageStr = "<h5 style='margin-left: 75px; color: red;'>Error: Invalid login</h5>";
    }
}
//Redirection for already logged in users
if(isset($_SESSION['loggedIn']) && $_SESSION['loggedIn']) {
    header("location:index.php");
    exit;
}
?>
<!DOCTYPE HTML>
<html lang="en">
<head>
<title>ECMS Database</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins|Oswald">
<link rel ="stylesheet" href="<?php echo $path; ?>css/style.css">
</head>
<body style = "background-color:  #004B98">
<div style = "text-align: center; margin: auto; width: 100%; height:50%; position: absolute; top:0; bottom:0; left:0; right:0; padding: 30px; background-color: #0A2240">
<img  style=" position:static; margin-left: 75px; width: 250px; height:200px" src="images/EMCSFD_Logo.png">
<!--<h3 class="w3-padding-34" style="text-align: center; margin-left: 20px; margin-top: -4px; font-size: 30px; color: white; font-family:'Oswald', sans-serif;">DATABASE LOGIN</h3>-->
    <div id="loginFormDiv" style="text-align: center; margin-top: 20px;">
    <form id="loginForm" method=post action=login.php>
    <label style="color: white;" for= "email"> Email: </label><input name="email" type="text" id = "email" style="margin-left: 28px; width: 20em;"><BR/>
    <label style="color: white;" for= "password"> Password: </label><input name="password" type="password" id="password" style="margin: 5px; width: 20em;"><BR/>
    <input type="hidden" name="login" value="login">
    <input type="submit" value="Submit" style="margin: 5px; margin-left: 75px;"><BR/>
    </form>
    <?php echo $messageStr ?>
    </div>
</div>
<script src="js/deletePostData.js" type="text/javascript"></script>
</body>
</html>