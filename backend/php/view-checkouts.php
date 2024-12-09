<?php
session_start();
include 'db.php';

$query = "SELECT S.student_id, S.student_name, S.student_group, B.title, C.checkout_date, C.return_date 
          FROM Checkouts C
          JOIN Students S ON C.student_id = S.student_id
          JOIN Books B ON C.book_isbn = B.isbn
          ORDER BY S.student_group";

$result = $conn->query($query);

if ($result->num_rows > 0) {
    echo "<table>
            <tr>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Group</th>
                <th>Book Title</th>
                <th>Checkout Date</th>
                <th>Return Date</th>
            </tr>";
    while ($row = $result->fetch_assoc()) {
        echo "<tr>
                <td>{$row['student_id']}</td>
                <td>{$row['student_name']}</td>
                <td>{$row['student_group']}</td>
                <td>{$row['title']}</td>
                <td>{$row['checkout_date']}</td>
                <td>{$row['return_date']}</td>
              </tr>";
    }
    echo "</table>";
} else {
    echo "No Checkouts Found.";
}
?>
