<?php header("Content-type: application/json");
$jsInput = json_decode(file_get_contents('php://input'), true);
require_once __DIR__ . "/database.php";
if (isset($jsInput['table'])) {
    $table = $jsInput['table'];
    $db = new Database($table);
    if ($jsInput['action'] == 'read') {$result = $db->jsHandler($jsInput['action']);
    } elseif ($jsInput['action'] == 'write') {$result = $db->jsHandler($jsInput['action'], $jsInput['data']);
    } elseif ($jsInput['action'] == 'modify') {$result = $db->jsHandler($jsInput['action'], $jsInput['data'], $jsInput['index']);}
    else {$result = $db->jsHandler($jsInput['action']);
    } echo $result;
} exit;