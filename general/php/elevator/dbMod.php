<?php session_start();
$db = $_SESSION['db'];

$jsInput = json_decode(file_get_contents('php://input'), true);
$index = $jsInput['index'];
$doors = $jsInput['doors'];
$sql = "UPDATE $db SET doors = $doors WHERE index = $index";

if ($_SESSION["con"]->connect_error) {
    echo "false";
    echo "Connection failed: " . $_SESSION["con"]->connect_error;
    exit;
} elseif ($_SESSION["con"]->query($sql) === TRUE) {
    $payload = "Door status updated successfully";
} else {
    $payload = "Error: " . $sql . "<br>" . $_SESSION["con"]->error;
}

echo $payload;
exit;