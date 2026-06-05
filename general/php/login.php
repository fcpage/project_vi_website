<?php $username = $_POST["username"]; $password = $_POST["password"];$result = 0; //Get login credentials, defaulting to lockout
$file = fopen("../documents/requests/login/logins.txt", "r",FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES); //open valid login list
while(!feof($file) && !$result) {$contents = fgets($file); //check each line until the file is through or the login is verified
    str_contains($contents, "username:$username-password:$password") ? ($result = 1) : ($result = 0);} //if the login key is found, make $result true, if not, make $result false
fclose($file); $result ? header("Location: ../html/.gui.html") : header("Location: ../html/lockout.html"); //close the login list and redirect to end page