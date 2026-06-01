<?php   if(!empty($_POST)) {$submitted = "Yes.";}
        else{$submitted = "No.";} ?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Login Form Handler Page</title>
	</head>
	<?php   $dir = "../resources/logins.txt";
            $file = new SplFileObject($dir, "r");
            $username = $_POST["username"];
            $password = $_POST["password"]; ?>
	<body>
		<p>Form Submitted? <?php echo $submitted; ?> </p>
		<h3>Login Info:</h3>
		<ul>
			<li><b>Username:</b> <?php echo $username; ?></li>
			<li><b>Password:</b> <?php echo $password; ?></li>
		</ul>
        <?php
            if($file->getExtension() === "txt") {
                $result = "Access denied.";
                $contents = NULL;
                while(!feof($file)) {
                    foreach($file as $line_num => $line) {
                        $contents = file_get_contents($file);
                        if(str_contains($contents, $username)
                                && str_contains($contents, $password)) {
                            $result = "Access granted.";
                            break;}
                        else { $result = "Access denied."; } }
                    echo $result;}}
            echo $contents;
            $redirect = match ($result) {
                "Access granted." => "gui.php",
                "Access denied." => "../lockout.html", };
            header("Location: $redirect");
            exit(); ?>
	</body>
</html>