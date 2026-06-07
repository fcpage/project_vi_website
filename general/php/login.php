<?php
$username = $_POST["username"]; //get supposed "username"
$password = $_POST["password"]; //what is the password?
$result = 0; //default to lockout
$file = fopen("../documents/requests/login/logins.txt", "r",FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES); //open valid login list

while(!feof($file) && !$result) {   //while not at the end of the login credential register and no match has been found
    $contents = fgets($file); //check each line until the file is through or the login is verified
    str_contains($contents, "username:$username-password:$password") ? ($result = 1) : ($result = 0);//if the login key is found, make $result true, if not, make $result false
}

fclose($file);
$result ? header("Location: ../html/.gui.html") : header("Location: ../html/lockout.html"); //close the login list and redirect to end page
//closing php tag is redundant apparently?