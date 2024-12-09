<?php
session_start();
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $checkout_id = $_POST['checkout_id'];
    $return_date = $_POST['return_date'];

    $query = "UPDATE Checkouts SET return_date='$return_date' WHERE checkout_id='$checkout_id'";
    
    if ($conn->query($query) === TRUE) {
        echo "<script>alert('Book Returned Successfully'); window.location='../dashboard/dashboard.php';</script>";
    } else {
        echo "Error: " . $conn->error;
    }
}
?>
