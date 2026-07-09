<?php ob_start();
session_start();
if(isset($_SESSION["username"])) {
    $user = explode("_", $_SESSION["username"]);
    echo "Welcome, " . ucfirst($user[0]) . "!<br/>";
    echo "Please <a href='../../../general/php/requests/logout.php'>LOG OUT</a> when you're finished."; //php includes the html
} else {
    echo "Please login first.";
    session_destroy();
    header("Location: ../../html/requests/login.html", "replace: true");
    ob_end_flush();
    exit;
}