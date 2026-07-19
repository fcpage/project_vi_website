<?php session_start();
$db = $_SESSION['db'];

$jsInput = json_decode(file_get_contents('php://input'), true);
$index = $jsInput['index'];
$sql = "SELECT * FROM $db ORDER BY $index";
$data = $db->query($sql);

if ($data->num_rows > 0) {
    while($row = $data->fetch_assoc()){
        if ($row["index"] == $index) {
            $data = $row;
            break;
        }
    }
}

$payload = json_encode([
    "db" => $db,
    "index" => $data['index'],
    "date" => $data['date'],
    "time" => $data['time'],
    "nodeID" => $data['nodeID'],
    "sender" => $data['sender'],
    "receiver" => $data['receiver'],
    "currentFloor" => $data['currentFloor'],
    $previousFloor = $jsInput['previousFloor'],
    "requestFloor" => $data['requestFloor'],
    "status" => $data['status'],
    "queued" => $data['queued'],
    "served" => $data['served']
]);

echo $payload;
exit;