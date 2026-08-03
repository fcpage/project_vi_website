<?php session_start();
$_SESSION["dbServer"] = "localhost";
$_SESSION["dbUser"] = "pi";
$_SESSION["dbPW"] = "ese";
$_SESSION["dbDB"] = "elevatorg1";
$_SESSION["db"] = "elevatorNetwork";
$_SESSION["con"] = new mysqli($_SESSION["dbServer"], $_SESSION["dbUser"], $_SESSION["dbPW"], $_SESSION["dbDB"]);

if ($_SESSION["con"]->connect_error) {
    echo "Connection to database failed: " . $_SESSION["con"]->connect_error;
    exit;
}

echo "Connected to database successfully";
exit;