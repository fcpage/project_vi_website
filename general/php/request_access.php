<?php $date = date("Y-m-d"); $time = date("H-i-s"); $key = [0=>"."]; $desc = [0=>"."];
array_push($key,'firstname', 'lastname', 'email', 'url', 'person', 'reason', 'details', 'deadline', 'good_job');
array_push($desc, "First Name: ", "Last Name: ", "Email: ", "Website: ", "Person: ", "Reason: ", "Details: ", "Deadline: ", "Feedback: ", "Involvement: ");
$contents = "Date: $date\nTime: $time\n\nAccess Request:\n\n"; $contents .= $desc[8];
foreach (array_filter($_POST['involvement']) as $i) {$contents = $contents .= $i;}; $contents .= "\n";
for($i=1; $i < 10; $i++) {$contents = $contents .= $desc[$i] .= $_POST[$key[$i]] .= "\n";}
file_put_contents("../documents/requests/access/access_request_{$date}_{$time}.txt", $contents); ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Review Access Request</title>
    <meta name="description" content="This is the access request handler page for our project" />
    <meta http-equiv="author" content="Fergus Page" />
    <meta name="robots" content="noindex nofollow" />
    <meta http-equiv="pragma" content="no-cache" />
    <link rel="stylesheet" href="../css/general_style.css" type="text/css">
</head>

<body>
    <h1>Access Form Handler Page</h1>
    <p>Your request has been submitted for consideration.<br/>Please review the details of your request below.</p>
    <h3>Access Request:</h3>
    <ul>
        <li><b>First Name</b> <?php echo $_POST['firstname']; ?></li>
        <li><b>Last Name</b> <?php echo $_POST['lastname']; ?></li>
        <li><b>Email</b> <?php echo $_POST['email']; ?></li>
        <li><b>Website</b> <?php echo $_POST['url']; ?></li>
        <li><b>Persona</b> <?php echo $_POST['person']; ?></li>
        <li><b>Involvement</b> <?php foreach (array_filter($_POST['involvement']) as $i) {echo $i;}?></li>
        <li><b>Reason</b> <?php echo $_POST['reason']; ?></li>
        <li><b>Details</b> <?php echo $_POST['details']; ?></li>
        <li><b>Deadline</b> <?php echo $_POST['deadline']; ?></li>
        <li><b>Feedback</b> <?php echo $_POST['good_job']; ?></li>
    </ul>
</body>
</html>