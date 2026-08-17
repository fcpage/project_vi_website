<?php
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);

header("Content-type: application/json");
require_once __DIR__ . "/Database.php";
$jsInput = json_decode(file_get_contents('php://input'), true);
$db = new Database($jsInput['table']);
foreach($jsInput as $key => $value) {
    $db->values[$key] = $value;
}

echo $db->jsHandler($jsInput['action']);
exit;