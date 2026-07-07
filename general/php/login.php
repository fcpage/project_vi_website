<?php
ob_start();
$username = $_POST["username"]; //get supposed "username"
$password = $_POST["password"]; //what is the password?
$contents = null; //declare empty file contents variable (global)
$auth = null; //declare authorization variable, default to lockout (global)
$result = 0; //declare authentication variable, default to lockout (global)
$file = fopen("../resources/requests/login/logins.txt", "r",FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES); //open valid login list

while(!feof($file) && !$result) {   //while not at the end of the login credential register and no match has been found
    $contents = fgets($file); //check each line until the file is through or the login is verified
    str_contains($contents, "username:$username-password:$password") ? ($result = 1) : ($result = 0);//if the login key is found, make $result true, if not, make $result false
}

fclose($file); //close the file

if (str_contains($contents, "dev")){ //if auth key is dev
    $auth = "dev";  //assign authorization key if found
} elseif (str_contains($contents, "prof")){ //else if auth key is prof
    $auth = "prof"; //assign authorization key if found
} elseif (str_contains($contents, "run")){ //else if auth key is run
    $auth = "run"; //assign authorization key if found
} else { //else
    $auth = null; //invalid auth key
}

if ($result && $auth) {    //if authentication is valid and there is a valid authorization key
    if ($auth == "dev") { //if authorization is "dev",
        header("Location: ../html/elevator/gui.html"); //redirect to gui
    } elseif ($auth == "prof") { //if authorization is "prof",
        header("Location: ../html/elevator/elevator_menu.html"); //redirect to elevator menu
    } elseif ($auth == "run") { //if authorization is "run",
        header("Location: ../html/elevator/elevator_doors.html"); //redirect to doors display
    } else {
        header("Location: ../html/elevator/lockout.html");} //if authorization is invalid, redirect to lockout page
} else {
    header("Location: ../html/elevator/lockout.html"); //if authorization is invalid, redirect to lockout page
} exit;

//closing php tag is redundant apparently?