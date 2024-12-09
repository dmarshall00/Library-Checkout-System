SELECT 
    S.student_id,
    S.student_name,  
    S.student_group,
    B.title, 
    C.checkout_date, 
    C.return_date
FROM 
    Checkouts C
JOIN 
    Students S ON C.student_id = S.student_id
JOIN 
    Books B ON C.book_isbn = B.isbn
ORDER BY 
    S.student_group;
