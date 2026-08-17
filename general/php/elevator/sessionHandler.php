<?php header("Content-type: application/json");
$jsInput = json_decode(file_get_contents('php://input'), true);
require_once __DIR__ . "/Session.php";
$session = new Session();
$data = json_encode($jsInput);
echo $session->jsHandler($jsInput['action'], $data);
exit;