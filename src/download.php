<?php
if(!isset($_SESSION))
    session_start();
//Unauthorized user protection
if(!isset($_SESSION['loggedIn']) || !$_SESSION['loggedIn']) {
    header("location:login.php");
    exit;
}

// Allow user to download CSV file, but only from export directory
if(isset($_GET['path'] && dirname($_GET['path']) == 'export')) {
    //Read the url
    $url = $_GET['path'];
    clearstatcache();
    if(file_exists($url)) {

        //Define header information
        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="'.basename($url).'"');
        header('Content-Length: ' . filesize($url));
        header('Pragma: public');

        //Clear system output buffer
        flush();
        readfile($url,true);
        exit;
    }
    else{
        echo "File path does not exist.";
    }
}
echo "File path is not defined."

?>