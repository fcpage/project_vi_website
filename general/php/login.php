<?php
$submitted = !empty($_POST);
?>

<!DOCTYPE html>
<html>
	<head>
		<title>Login Form Handler Page</title>
	</head>
	
	<body>
		<p>Form Submitted? <?php echo (int) $submitted; ?> </p>
		<p>Login Info:</p>
		<ul>
			<li><b>Username:</b> <?php echo $_POST['username']; ?></li>
			<li><b>Password:</b> <?php echo $_POST['password']; ?></li>
		</ul>
	</body>
</html>