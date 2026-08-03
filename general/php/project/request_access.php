<?php date_default_timezone_set('America/Toronto');
$date = date("Y-m-d"); //What day is it???
$time = date("H:i:s"); //Do you have the time, to listen to me whine?
$key = [0=>"."];    //initialize the key array, non-null
$desc = [0=>"."];   //initialize the description array, non-null
array_push($key,'firstname', 'lastname', 'email', 'url', 'person', 'reason', 'details', 'deadline', 'good_job');    //load the keys
array_push($desc, "First Name: ", "Last Name: ", "Email: ", "Website: ", "Person: ", "Reason: ", "Details: ", "Deadline: ", "Feedback: ", "Involvement: "); //load the descriptions
$contents = "Access Request:\nDate: " . $date . "\nTime: " . $time . "\n\n";  //build the request header
$contents .= $desc[8];  //involvement description

foreach (array_filter($_POST['involvement']) as $i) { //for every checked element
    $contents = $contents .= $i;    //add it to the data conglomerate
}

$contents .= "\n";  //new line!

for($i=1; $i < 10; $i++) {  //for every key
    $contents = $contents .= $desc[$i] .= $_POST[$key[$i]] .= "\n"; //append the descriptions and values
}

file_put_contents("../resources/requests/access/access_request_{$date}_{$time}.txt", $contents);    //write the log file and give it a unique file name
?>

<!DOCTYPE html>
<html lang="en">

<head>S
    <title>Review Access Request</title>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="This is the access request handler page for our project" />
    <meta http-equiv="author" content="Fergus Page" />
    <meta name="robots" content="noindex nofollow" />
    <meta http-equiv="pragma" content="no-cache" />

    <link rel="stylesheet" href="../../css/project/general_style.css" type="text/css">
</head>

<body>
    <a href="../../../index.html">Home</a><br/>
    <h1>Access Form Handler Page</h1>   <!-- this bit is the onscreen review -->
    <p>Your request has been submitted for consideration.<br/>Please review the details of your request below.</p>  <!-- some small talk -->

    <h3>Access Request:</h3>    <!-- here are the details -->
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