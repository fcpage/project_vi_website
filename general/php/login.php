<?php $username = $_POST["username"]; $password = $_POST["password"]; $result = 0; //Get login credentials, defaulting to lockout
$file = fopen("../documents/logins.txt", "r",FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES); //open valid login list
$line = "username:$username-password:$password"; //assemble login key for file reference
while(!feof($file) && !$result) {$contents = fgets($file); //check each line until the file is through or the login is verified
    str_contains($contents, $line) ? ($result = 1) : ($result = 0);} //if the login key is found, make $result true, if not, make $result false
fclose($file); $result ? header("../html/.gui.html") : header("../html/lockout.html"); //close the list and redirect to end page