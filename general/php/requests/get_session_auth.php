<?php session_start();
if(isset($_SESSION["authorization"])) {
    $authorization = explode("_", $_SESSION["authorization"]);
    echo $authorization[0];
} else {
    echo "false";
} exit;
