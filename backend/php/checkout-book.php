<?php
session_start();
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $student_id = $_POST['student_id'];
    $book_isbn = $_POST['book_isbn'];
    $checkout_date = $_POST['checkout_date'];

    $query = "INSERT INTO Checkouts (student_id, book_isbn, checkout_date) 
              VALUES ('$student_id', '$book_isbn', '$checkout_date')";
              
    if ($conn->query($query) === TRUE) {
        echo "<script>alert('Book Checked Out Successfully'); window.location='../dashboard/dashboard.php';</script>";
    } else {
        echo "Error: " . $conn->error;
    }
}
?>
