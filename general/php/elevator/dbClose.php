<?php session_start();
$_SESSION["con"]->close();
echo "Database connection ended.";
exit;