<?PHP
//This file is used by manage_accounts.php to change passwords, add and delete accounts, etc.
require_once("../config.php");
require_once("functions/database_functions.php");

function changePassword($user,$newPassword) {
    $loginString = "SALT14PS".$newPassword."PSSALT2";
    $sql = "UPDATE user SET passwordHash = sha2(:p,512) WHERE userID = :id;";
    $pdo = connect_to_db();
    $stmt = $pdo->prepare($sql);
    $stmt->execute([":p"=>$loginString,":id"=>$user["userID"]]); 
}

function displayAllAccounts() {
    $users = getAllAccountsFromDB();
    if(!is_array($users)) {
        echo "Error: Failed to fetch users from database";
        exit;
    }
    echo "<table style='border: none; border-collapse: separate; border-spacing: 0px 10px;'><tbody>";
    foreach($users as $user) {
        echo "<tr style='padding: 5px;'><td style='padding: 5px; min-width: 30em;'>";
        echo "<span>".$user['firstName']." ".$user['lastName']."     </span>";
        echo "<span style='float: right;'>".$user['email']."</span>";
        echo "<BR/><span>Permission Level: ".$user['permissionLevel']."     </span>";
        if($user['userID'] != $_SESSION["userID"]) {
            echo "<form style='display: inline;' method='POST' action='manage_accounts.php'>";        
            echo "<input type='hidden' name='userIDToDelete' value='".$user["userID"]."'>";
            echo "<button type='button' style='float: right;' class='deleteUser'>Delete User</button>";
            echo "</form>";
        }
        else {
            echo "<span style='float: right;'><b>You</b></span>";
        }
        echo "</td></tr>";
    }
    unset($user);
    echo "</tbody></table>";
    echo "<script type='text/javascript' src='js/userDelete.js'></script>";
}

function display_account_form() {
    echo "<form method='POST' action='manage_accounts.php' id='addAccountForm'>";
    echo "<b><label for='email'>Email: </label></b><input type='text' id='email' name='email'><BR/>";
    echo "<i><span>Note: This email will also be used as their username</span></i><BR/>";
    echo "<b><label for='firstName'>First Name: </label></b><input type='text' id='firstName' name='firstName'><BR/>";
    echo "<b><label for='lastName'>Last Name: </label></b><input type='text' id='lastName' name='lastName'><BR/>";
    echo "<b><label for='password'>Password: </label></b><input type='password' id='password' name='password'><BR/>";
    echo "<b><label for='permissionLevel'>Permission Level: </label></b><input type='number' id='permissionLevel' name='permissionLevel'><BR/>";
    echo "<i><span>Note: Accounts with permission level of 10 or higher can delete and add accounts</span></i><BR/>";
    echo "<input type='hidden' name='addAccount' value='YES'>";
    echo "<input type='button' id='accountFormSubmit' value='Submit'>";
    echo "</form>";
    echo "<script type='text/javascript' src='js/addAccount.js'></script>";
}

///// Database functions /////
function getAllAccountsFromDB() {
    $pdo = connect_to_db();
    $sql = "SELECT * FROM user ORDER BY userID;";
    $data = $pdo->query($sql)->fetchAll();
    return $data;
}

function deleteAccount($id) {
    $pdo = connect_to_db();
    $sql = "DELETE FROM user WHERE userID = :id;";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([":id"=>$id]); 
}

function createAccount($postData) {
    $pdo = connect_to_db();
    $loginString = "SALT14PS".$postData["password"]."PSSALT2";
    $sql = "INSERT INTO user (email,firstName,lastName,permissionLevel,passwordHash) VALUES (:email,:firstName,:lastName,:permissionLevel,sha2(:passwordHash,512));";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([":email" => $postData["email"],":firstName" => $postData["firstName"],":lastName" => $postData["lastName"],":permissionLevel" => $postData["permissionLevel"],":passwordHash" => $loginString]);
}
?>