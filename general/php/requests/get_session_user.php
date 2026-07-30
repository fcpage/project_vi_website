<?php session_start();
if(isset($_SESSION["username"])) {
    $user = explode("_", $_SESSION["username"]);
    echo ucfirst($user[0]);
} else {
    echo "false";
} exit;