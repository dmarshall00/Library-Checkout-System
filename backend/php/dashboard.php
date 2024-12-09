<?php
session_start();
if (!isset($_SESSION['user'])) {
    header("Location: ../frontend/index.html");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Dashboard</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<header>
    <h1>Welcome, <?php echo $_SESSION['user']; ?>!</h1>
</header>

<main>
    <h2>Library Dashboard</h2>
    <p>Manage your library from this panel.</p>
    <a href="logout.php" class="logout">Logout</a>
</main>

</body>
</html>
