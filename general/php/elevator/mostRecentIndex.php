<?php session_start();
$db = $_SESSION['db'];

if ($_SESSION['con']->connect_error) {
    echo 'false';
    die('Connection failed: ' . $_SESSION['con']->connect_error);
}

$sql = "SELECT index FROM $db ORDER BY index DESC LIMIT 1;" . $db;
$data = $db->query($sql);
echo ($data['index']);
exit;