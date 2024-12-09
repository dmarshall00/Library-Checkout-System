<?php
$host = "localhost";
$user = "root";  
$pass = '9820jajdn5$$H';  
$db = "library_mgmt";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
