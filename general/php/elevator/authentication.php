<?php date_default_timezone_set('America/Toronto');
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

require_once __DIR__ . "/Session.php";  //require the session class
require_once __DIR__ . "/Database.php"; //require the database class

//Initialization
$login = new Database("loginRegistry", array(null));
$log = new Database("accessAttempts", array(null));
$authentication = "invalid"; //initialize null authentication variable, default to lockout (global)
$authorization = "none"; //initialize null authorization variable, default to lockout (global)
$username = $_POST["username"]; //get supposed "username"
$password = $_POST["password"]; //what is the password?

//Authentication
foreach ($login->readEntry(-1, -1) as $entry) {
    if (($entry['username'] == $username) && ($entry['password'] == $password)) {
        $log->values['authentication'] = $authentication = "valid";
        $log->values['username'] = $login->values['username'] = $entry["username"];
        $login->values['password'] = $entry["password"];
        $log->values['authorization'] = $login->values['authorization'] = $entry["authorization"];
        echo "Login Accepted.";
        break;
    }
}

//Logging
$log->logger();

//LET ME IIIINNNNNNNN!!!!!
if (($authentication !== "invalid") && (in_array($login->values['authorization'], $login->authList,true))) {    //if authentication is valid and there is a valid authorization key
    //Session begins
    $session = new Session();
    $session->setSession("login", "true");
    $session->setSession("username", $login->values['username']);
    $session->setSession("authorization", $login->values['authorization']);

    //Redirection
    if ($session->getAuth() == "dev") { //if authorization is "dev",
        $requests = new Database('accessRequests');
        $waiting[] = null;
        $i = 0;

        foreach ($requests->readEntry(-1, -1) as $entry) {
            if ($entry['granted'] == 0) {
                $_SESSION['toGrant' . $i] = $requests->readEntry($entry['index']);
            }$i++;
        } $_SESSION['grantsWaiting'] = $i;

        if ($_SESSION['grantsWaiting'] > 0) {
            header("Location: ../../html/requests/grantAccess.html");
        } else {
            header("Location: ../../html/elevator/gui.html"); //redirect to gui
        }

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