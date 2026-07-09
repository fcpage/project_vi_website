<?php
$log = null; //initialize a null variable for attempt logging
$contents = null; //initialize null file contents variable (global)
$authentication = null; //initialize null authentication variable, default to lockout (global)
$authorization = null; //initialize null authorization variable, default to lockout (global)
$username = $_POST["username"]; //get supposed "username"
$password = $_POST["password"]; //what is the password?

//Authentication
$file = fopen("../../resources/requests/login/logins.txt", "r",FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES); //open valid login list
while(!feof($file) && !$authentication) {   //while not at the end of the login credential register and no match has been found
    $contents = fgets($file); //check each line until the file is through or the login is verified
    str_contains($contents, "username:$username-password:$password") ? ($authentication = "valid") : ($result = null);}//if the authentication key found, make $authentication valid, or else null
fclose($file); //close the file

//Authorization
if (str_contains($contents, "-auth:dev")){ //if auth key is dev
    $authorization = "dev";  //assign authorization key if found
} elseif (str_contains($contents, "-auth:prof")){ //else if auth key is prof
    $authorization = "prof"; //assign authorization key if found
} elseif (str_contains($contents, "-auth:run")){ //else if auth key is run
    $authorization = "run"; //assign authorization key if found
} else {$authorization = null;} //else if no authorization, invalid authorization key

//Logging
$log = "Date:" . date("Y-m-d");", Time:" . date("H:i:s") . "\n";  //log the login attempt date and time
$log .= "Username: " . $username . "\n" ; //log the entered username
($authentication != "valid") ? ($log .= "Authentication: " . "invalid" . "\n") : ($log .= "Authentication: " . "valid" . "\n"); //log authentication status
($authorization == null) ? ($log .= "Authorization: " . "invalid" . "\n\n") : ($log .= "Authorization: " . $authorization . "\n\n"); //log authorization credentials
file_put_contents("../resources/requests/login/login_attempts.txt", $log, FILE_APPEND); //log the login attempt

//Redirection
if ($authentication && $authorization) {    //if authentication is valid and there is a valid authorization key
    session_start();
    $_SESSION["username"] = $username;
    $_SESSION["authorization"] = $authorization;
    if ($authorization == "dev") { //if authorization is "dev",
        header("Location: ../../html/elevator/gui.html"); //redirect to gui
    } elseif ($authorization == "prof") { //if authorization is "prof",
        header("Location: ../../html/elevator/elevator_menu.html"); //redirect to elevator menu
    } elseif ($authorization == "run") { //if authorization is "run",
        header("Location: ../../html/elevator/elevator_doors.html"); //redirect to doors display
    } else {session_destroy();
        header("Location: ../../html/requests/lockout.html");} //if authorization is invalid, redirect to lockout page
} else {session_destroy();
    header("Location: ../../html/requests/lockout.html"); //if authorization is invalid, redirect to lockout page
} exit; //quit running the page