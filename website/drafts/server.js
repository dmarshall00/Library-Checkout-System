const express = require('express');
const path = require('path');
const cors = require('cors');
const { sequelize, Student, Checkout, Book, Sequelize } = require('./LibraryMgmtModels');  // Import Op here
const { Op } = require('sequelize');

const app = express();
const port = 3000;

app.use(cors());  // Enable CORS for all routes
app.use(express.json());
app.use(express.static(path.join(__dirname, 'library_system')));

// Route for testing
app.get('/search/student', async (req, res) => {
    try {
      const studentName = req.query.name.trim();
      console.log("Searching for student:", studentName);  // Debugging line
  
      const student = await Student.findOne({
        where: { student_name: { [Op.like]: `%${studentName}%` } },
        include: [{
          model: Checkout,
          include: [{
            model: Book
          }]
        }]
      });
  
      // Debugging: log the entire student object to check the relationships
      console.log("Fetched Student Data:", JSON.stringify(student, null, 2));
  
      if (!student) {
        return res.json({ message: "Student not found." });
      }
      console.log("Student Checkouts:", student.Checkouts);

  
      // Format the data to send back to the frontend
      const formattedStudent = {
        student_id: student.student_id,
        student_name: student.student_name,
        student_group: student.student_group,
        Checkouts: student.Checkouts.map(checkout => {
          console.log("Checkout Object:", checkout);  // Add a log here
          console.log("Checkout Book Data:", checkout.Book);  // Log the Book associated with this Checkout
      
          const book = checkout.Book || {};  // Ensure we don't try to access properties of null
          return {
            checkout_id: checkout.checkout_id,
            checkout_date: checkout.checkout_date,
            return_date: checkout.return_date,
            book_isbn: checkout.book_isbn,
            book_title: book.title || 'Unknown Book',  // Fallback to 'Unknown Book' if no title
            book_author: book.author || 'Unknown Author',  // Fallback to 'Unknown Author' if no author
            book_rating: book.rating || 'No Rating'  // Fallback to 'No Rating' if no rating
          };
        })
      };
      
  
      console.log("Formatted Student Data:", formattedStudent);
      res.json(formattedStudent);  // Sending the data as a JSON response
    } catch (error) {
      console.error('Error fetching student:', error);
      res.status(500).json({ message: "An error occurred. Please try again." });
    }
  });

// Route to search for a book and show which students checked it out
app.get('/search/book', async (req, res) => {
    try {
      const bookTitle = req.query.title.trim();
  
      if (!bookTitle) {
        return res.status(400).json({ message: "Please provide a book title." });
      }
  
      // Search for the book by title
      const book = await Book.findOne({
        where: { title: { [Op.like]: `%${bookTitle}%` } },
        include: [{
          model: Checkout,
          include: [{
            model: Student
          }]
        }]
      });
  
      if (!book) {
        return res.status(404).json({ message: "Book not found." });
      }
  
      // Prepare the data to be returned (student info)
      const formattedBook = {
        book_title: book.title,
        book_author: book.author,
        book_isbn: book.isbn,
        Checkouts: book.Checkouts.map(checkout => {
          const student = checkout.Student;
          return {
            student_name: student.student_name,
            student_group: student.student_group,
            checkout_date: checkout.checkout_date,
            return_date: checkout.return_date
          };
        })
      };
  
      res.json(formattedBook);
    } catch (error) {
      console.error('Error fetching book data:', error);
      res.status(500).json({ message: "An error occurred. Please try again." });
    }
  });

  // Route for listing all students
app.get('/students', async (req, res) => {
    try {
      const students = await Student.findAll({
        include: [{
          model: Checkout,
          include: [Book]
        }]
      });
  
      const formattedStudents = students.map(student => ({
        student_id: student.student_id,
        student_name: student.student_name,
        student_group: student.student_group,
        Checkouts: student.Checkouts.map(checkout => {
          const book = checkout.Book || {};  // Prevent null errors
          return {
            checkout_id: checkout.checkout_id,
            checkout_date: checkout.checkout_date,
            return_date: checkout.return_date,
            book_title: book.title || 'Unknown Book',
            book_author: book.author || 'Unknown Author'
          };
        })
      }));
  
      res.json(formattedStudents);  // Sending the list of all students
    } catch (error) {
      console.error('Error fetching students:', error);
      res.status(500).json({ message: 'An error occurred while fetching students.' });
    }
  });
  
  // Serve the all-books.html page when requested
  // Route to list all books and their borrowers
app.get('/listBooks', async (req, res) => {
    try {
      // Fetch all books with their related checkouts and student info
      const books = await Book.findAll({
        include: [{
          model: Checkout,
          include: [{
            model: Student
          }]
        }]
      });
  
      // Format the book data
      const formattedBooks = books.map(book => ({
        title: book.title,
        author: book.author,
        checkouts: book.Checkouts.map(checkout => ({
          student_name: checkout.Student.student_name,
          student_group: checkout.Student.student_group,
          return_date: checkout.return_date
        }))
      }));
  
      // Send the formatted books data to the front-end
      res.json(formattedBooks);
    } catch (error) {
      console.error('Error fetching books:', error);
      res.status(500).json({ message: "An error occurred. Please try again." });
    }
  });
  
    

// Start the server
app.listen(port, () => {
  console.log(`Library management system is running on http://localhost:${port}`);
});