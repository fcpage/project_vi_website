<?php
$submitted = !empty($_POST);
?>

<!DOCTYPE html>
<html>
	<head>
		<title>Form Handler Page</title>
	</head>
	
	<body>
		<p>Form Submitted? <?php echo (int) $submitted; ?> </p>
		<p>Access Request:</p>
		<ul>
			<li><b>Details</b> <?php echo $_POST['access']; ?></li>
		</ul>
	</body>
</html>