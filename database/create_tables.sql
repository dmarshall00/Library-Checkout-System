CREATE DATABASE IF NOT EXISTS library_mgmt;

USE library_mgmt;

CREATE TABLE Books (
    isbn VARCHAR(20) PRIMARY KEY,      -- ISBN as the primary key
    title VARCHAR(255) NOT NULL,       -- Title of the book
    author VARCHAR(255),               -- Author of the book
    translator VARCHAR(255),           -- Translator (if applicable)
    book_format VARCHAR(50),           -- Format (e.g., hardcover, paperback)
    pages INT,                         -- Number of pages
    publisher VARCHAR(255),            -- Publisher's name
    published DATE,                    -- Date of publication
    book_year INT,                     -- Year of publication
    votes INT,                         -- Number of votes
    rating FLOAT                       -- Average rating
);

CREATE TABLE Students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,    -- Student ID as primary key
    student_name VARCHAR(255) NOT NULL,            -- Student's full name
    student_group VARCHAR(5)                       -- Student's group/class
);

CREATE TABLE Checkouts (
    checkout_id INT AUTO_INCREMENT PRIMARY KEY,   -- Checkout ID as primary key
    student_id INT,                               -- Foreign key referencing Students
    book_isbn VARCHAR(20),                        -- Foreign key referencing Books
    checkout_date DATE,                           -- Date when the book was checked out
    return_date DATE,                             -- Date when the book was returned (NULL if not returned yet)
    FOREIGN KEY (student_id) REFERENCES Students(student_id),  -- Foreign key constraint for student_id
    FOREIGN KEY (book_isbn) REFERENCES Books(isbn)           -- Foreign key constraint for book_isbn
);
