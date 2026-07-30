<?php session_start();
$db = $_SESSION['db'];

$jsInput = json_decode(file_get_contents('php://input'), true);
$index = $jsInput['index'];
$date = $jsInput['date'];
$time = $jsInput['time'];
$sender = $jsInput['sender'];
$receiver = $jsInput['receiver'];
$currentFloor = $jsInput['currentFloor'];
$previousFloor = $jsInput['previousFloor'];
$requestFloor = $jsInput['requestFloor'];
$status  = $jsInput['status'];
$queued  = $jsInput['queued'];
$served  = $jsInput['served'];

$sql = "INSERT INTO $db (index, date, time, nodeID, sender, receiver, currentFloor, requestFloor, status, queued, served)
VALUES ($index, $date, $time, $sender, $receiver, $currentFloor, $requestFloor, $status, $queued, $served,)";

if ($_SESSION["con"]->connect_error) {
    echo "false";
    echo "Connection failed: " . $_SESSION["con"]->connect_error;
    exit;
} elseif ($_SESSION["con"]->query($sql) === TRUE) {
    $payload = "New record created successfully";
} else {
    $payload = "Error: " . $sql . "<br>" . $_SESSION["con"]->error;
}

echo $payload;
exit;