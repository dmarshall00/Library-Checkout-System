CREATE DATABASE IF NOT EXISTS library_mgmt;

USE library_mgmt;

-- Create the Books table in library_mgmt (this will not affect the other database's Books table)
CREATE TABLE IF NOT EXISTS Books (
    isbn VARCHAR(20) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    translator VARCHAR(255),
    format VARCHAR(50),
    pages INT,
    publisher VARCHAR(255),
    published DATE,
    year INT,
    votes INT,
    rating FLOAT
);

-- Create Students table
CREATE TABLE IF NOT EXISTS Students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    `group` VARCHAR(5)
);

-- Create Checkouts table in library_mgmt
CREATE TABLE IF NOT EXISTS Checkouts (
    checkout_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    book_id VARCHAR(20),
    checkout_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    return_date DATE,
    FOREIGN KEY (student_id) REFERENCES Students(student_id),
    FOREIGN KEY (book_id) REFERENCES Books(isbn)  -- Books table in the same library_mgmt database
);
