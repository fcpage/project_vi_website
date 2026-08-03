<?php session_start();
if(isset($_SESSION["login"])) {
    $login = explode("_", $_SESSION["login"]);
    echo $login[0];
} else {
    echo "false";
} exit;