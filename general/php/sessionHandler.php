<?php header("Content-type: application/json");
$jsInput = json_decode(file_get_contents('php://input'), true);
require_once __DIR__ . "/session.php";
if (isset($jsInput['action'])) {
    $session = new Session();
    if ($jsInput['action'] == 'set') {$result = $session->jsHandler($jsInput['action'], $jsInput['target'], $jsInput['input']);
    } elseif ($jsInput['action'] == 'get') {$result = $session->jsHandler($jsInput['action'], $jsInput['target']);
    } else {$result = $session->jsHandler($jsInput['action']);
    } echo $result;
} exit;