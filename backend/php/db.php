<?php
require __DIR__ . '/vendor/autoload.php';
$required_env = ['DB_HOST', 'DB_USER', 'DB_PASS', 'DB_NAME'];

foreach ($required_env as $env_var) {
    if (empty($_ENV[$env_var])) {
        die("Missing required environment variable: $env_var");
    }
}

use Dotenv\Dotenv;
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

$host = $_ENV['DB_HOST'];
$user = $_ENV['DB_USER'];
$pass = $_ENV['DB_PASS'];
$db = $_ENV['DB_NAME'];

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}
?>
