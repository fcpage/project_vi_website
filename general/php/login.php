<?php   if(!empty($_POST)) {$submitted = "Yes.";}
        else{$submitted = "No.";} ?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Login Form Handler Page</title>
	</head>
	<?php   $dir = "../documents/logins.txt";
            $file = fopen($dir, "r",FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            $username = $_POST["username"];
            $password = $_POST["password"]; ?>
	<body>
		<p>Form Submitted? <?php echo $submitted; ?> </p>
		<h3>Login Info:</h3>
		<ul>
			<li><b>Username:</b> <?php echo $username; ?></li>
			<li><b>Password:</b> <?php echo $password; ?></li>
		</ul>
        <?php   $result = "Access denied.";
                $contents = ".";
                $line = "username:$username-password:$password";
                while(!feof($file)) {$contents = fgets($file);
                    if(str_contains($contents, $line)) {
                        $result = "Access granted.";
                        break;}
                    else {
                        $result = "Access denied."; }}
                    echo $result;
                    fclose($file);
                $redirect = match ($result) {
                    "Access granted." => "../html/gui.html",
                    "Access denied." => "../html/lockout.html", };
                header("Location: $redirect");

                exit(); ?>
	</body>
</html>