<?php
session_start();
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $isbn = $_POST['isbn'];
    $title = $_POST['title'];
    $author = $_POST['author'];
    $translator = $_POST['translator'];
    $format = $_POST['book_format'];
    $pages = $_POST['pages'];
    $publisher = $_POST['publisher'];
    $published = $_POST['published'];
    $year = $_POST['book_year'];
    $votes = $_POST['votes'];
    $rating = $_POST['rating'];

    $query = "INSERT INTO Books VALUES ('$isbn', '$title', '$author', '$translator', '$format', '$pages', '$publisher', '$published', '$year', '$votes', '$rating')";
    if ($conn->query($query) === TRUE) {
        echo "<script>alert('Book Added Successfully'); window.location='../dashboard/dashboard.php';</script>";
    } else {
        echo "Error: " . $conn->error;
    }
}
?>
