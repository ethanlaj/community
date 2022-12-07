<?php
//This file obtains the database access credentials from config.php
require_once(__DIR__."/../../config.php");
//This file is used by many other files to connect to the database
//This file is also used by login.php to authenticate users

function connect_to_db(){

    global $database,$databasehost,$databaseuser,$databasepassword;
    $dsn = "mysql:host=$databasehost;dbname=$database;charset=UTF8";
    
    $pdo = new PDO($dsn, $databaseuser, $databasepassword);
    return $pdo;
}
function authorizeUser($username,$password){
    $loginString = "SALT14PS".$password."PSSALT2";
    $sql = "SELECT * FROM user where email = :u and passwordHash = sha2(:p,512) ;";
    $params = [":u"=>$username,":p"=>$loginString];
    //send to database to check for user
    $rowInDB = false;
    $pdo = connect_to_db();
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params); 
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    //if user is there
    if(is_array($user) && isset($user["firstName"]))
        return $user;
    else
        return false;
}
?>