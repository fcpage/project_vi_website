<?php
$date = date("Y-m-d");  //what day is it??? It's summertime!
$time = date("H:i:s");  //do you have the time, to listen to me whine?
$contents = null; //declare empty file contents variable (global)
$authentication = null; //declare authentication variable, default to lockout (global)
$authorization = null; //declare authorization variable, default to lockout (global)

$username = $_POST["username"]; //get supposed "username"
$password = $_POST["password"]; //what is the password?

$file = fopen("../resources/requests/login/logins.txt", "r",FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES); //open valid login list

while(!feof($file) && !$authentication) {   //while not at the end of the login credential register and no match has been found
    $contents = fgets($file); //check each line until the file is through or the login is verified
    str_contains($contents, "username:$username-password:$password") ? ($authentication = "valid") : ($result = null);//if the login key is found, make $result true, if not, make $result false
}

fclose($file); //close the file

if (str_contains($contents, "dev")){ //if auth key is dev
    $authorization = "dev";  //assign authorization key if found
} elseif (str_contains($contents, "prof")){ //else if auth key is prof
    $authorization = "prof"; //assign authorization key if found
} elseif (str_contains($contents, "run")){ //else if auth key is run
    $authorization = "run"; //assign authorization key if found
} else { //else
    $authorization = null; //invalid auth key
}

$log = "Date: $date, Time: $time\n\n";  //log the login attempt date and time
$log .= "Username: " . $username . "\n" ; //log the entered username
($authentication != "valid") ? ($log .= "Authentication: " . "invalid" . "\n") : ($log .= "Authentication: " . "valid" . "\n"); //log authentication status
($authorization == null) ? ($log .= "Authorization: " . "invalid" . "\n\n") : ($log .= "Authorization: " . $authorization . "\n\n"); //log authorization credentials
$file = fopen("../resources/requests/login/login_attempts.txt", "a"); //open login attempt log file in append mode
file_put_contents("../resources/requests/login/login_attempts.txt", $log, FILE_APPEND); //log the login attempt
fclose($file); //close the file

if ($authentication && $authorization) {    //if authentication is valid and there is a valid authorization key
    if ($authorization == "dev") { //if authorization is "dev",
        header("Location: ../html/elevator/gui.html"); //redirect to gui
    } elseif ($authorization == "prof") { //if authorization is "prof",
        header("Location: ../html/elevator/elevator_menu.html"); //redirect to elevator menu
    } elseif ($authorization == "run") { //if authorization is "run",
        header("Location: ../html/elevator/elevator_doors.html"); //redirect to doors display
    } else {
        header("Location: ../html/elevator/lockout.html");} //if authorization is invalid, redirect to lockout page
} else {
    header("Location: ../html/elevator/lockout.html"); //if authorization is invalid, redirect to lockout page
} exit;

//closing php tag is redundant apparently?