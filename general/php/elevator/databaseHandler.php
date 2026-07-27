<?php header("Content-type: application/json");
$jsInput = json_decode(file_get_contents('php://input'), true);
require_once __DIR__ . "/Database.php";
$db = new Database($jsInput['table']);
echo $db->jsHandler($jsInput['action'], $jsInput);
exit;