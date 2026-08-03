<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
require_once __DIR__ . "/Session.php";
require_once __DIR__ . "/Database.php";
$login = new Database("loginRegistry");
$log = new Database("accessAttempts");
$authentication = "invalid"; //initialize null authentication variable, default to lockout (global)
$authorization = "none"; //initialize null authorization variable, default to lockout (global)
$username = $_POST["username"]; //get supposed "username"
$password = $_POST["password"]; //what is the password?

//Authentication
foreach ($login->readEntry(null, -1) as $entry) {
    if (($entry["username"] == $username) && ($entry["password"] == $password)) {
        $authentication = "valid";
        $login->username = $entry["username"];
        $login->password = $entry["password"];
        $login->authorization = $entry["authorization"];
        echo "Login Accepted.";
        break;
    }
}

echo "hey";
//Logging
$log->logger($login->username, $login->authorization, $authentication);
echo "hey";
echo $login->authorization;
echo $authentication;

//LET ME IIIINNNNNNNN!!!!!
if (($authentication !== "invalid") && (in_array($login->authorization, $login->authList,true))) {    //if authentication is valid and there is a valid authorization key
    //Session begins
    $session = new Session();
    $session->setSession("login", "true");
    $session->setSession("username", $login->username);
    $session->setSession("authorization", $login->authorization);
    setcookie("login", "true", [
        'expires' => "86400",
        'path' => "/",
        'secure' => true,
        'httponly' => false,
        'samesite' => 'Lax']);

    //Redirection
    if ($session->getAuth() == "dev") { //if authorization is "dev",
        header("Location: ../../html/elevator/gui.html"); //redirect to gui
    } elseif ($session->getAuth() == "prof") { //if authorization is "prof",
        header("Location: ../../html/elevator/elevator_menu.html"); //redirect to elevator menu
    } elseif ($session->getAuth() == "run") { //if authorization is "run",
        header("Location: ../../html/elevator/elevator_doors.html"); //redirect to doors display
    } elseif ($session->getAuth() == "admin") {
        header("Location: ../../html/elevator/maintenance.html"); //redirect to admin display
    } else {$session->__destruct();
        header("Location: ../../html/requests/lockout.html");} //if authorization is invalid, redirect to lockout page
} else {session_destroy();
    header("Location: ../../html/requests/lockout.html"); //if authorization is invalid, redirect to lockout page
} exit; //quit running the page