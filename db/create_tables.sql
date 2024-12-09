-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS library_mgmt;

USE library_mgmt;

-- Users table with timestamp support
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Books table
CREATE TABLE Books (
    isbn VARCHAR(20) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    translator VARCHAR(255),
    book_format VARCHAR(50),
    pages INT,
    publisher VARCHAR(255),
    published DATE,
    book_year INT,
    votes INT,
    rating FLOAT
);

-- Students table
CREATE TABLE Students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(255) NOT NULL,
    student_group VARCHAR(5)
);

-- Checkouts table with foreign keys
CREATE TABLE Checkouts (
    checkout_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    book_isbn VARCHAR(20),
    checkout_date DATE,
    return_date DATE,
    FOREIGN KEY (student_id) REFERENCES Students(student_id),
    FOREIGN KEY (book_isbn) REFERENCES Books(isbn)
);
