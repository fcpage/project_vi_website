<?php
$submitted = !empty($_POST);
?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Access Form Handler Page</title>
	</head>
	
	<body>
		<p>Form Submitted? <?php echo (int) $submitted; ?> </p>
		<p>Access Request:</p>
		<ul>
			<li><b>First Name</b> <?php echo $_POST['firstname']; ?></li>
			<li><b>Last Name</b> <?php echo $_POST['lastname']; ?></li>
			<li><b>Email</b> <?php echo $_POST['email']; ?></li>
			<li><b>Website</b> <?php echo $_POST['url']; ?></li>
			<li><b>Persona</b> <?php echo $_POST['person']; ?></li>
			<li><b>Involvement</b> <?php echo $_POST['involvement']; ?></li>
			<li><b>Reason</b> <?php echo $_POST['reason']; ?></li>
			<li><b>Details</b> <?php echo $_POST['details']; ?></li>
			<li><b>Deadline</b> <?php echo $_POST['deadline']; ?></li>
			<li><b>Feedback</b> <?php echo $_POST['good_job']; ?></li>
		</ul>
	</body>
</html>