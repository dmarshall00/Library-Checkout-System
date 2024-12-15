const express = require('express');
const cors = require('cors');
const { sequelize, Student, Book, Checkout } = require('./LibraryMgmtmodels');
const app = express();
const port = 3000;

// Use CORS middleware (if needed)
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route to fetch all books
app.get('/books', async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).send('Error retrieving books: ' + error.message);
  }
});

// Route to fetch all students
app.get('/students', async (req, res) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (error) {
    res.status(500).send('Error retrieving students: ' + error.message);
  }
});

// Route to search for borrowed books by student (search by student name or ID)
app.get('/search/student', async (req, res) => {
    try {
      const studentName = req.query.name;
      const student = await Student.findOne({
        where: { student_name: studentName },
        include: {
          model: Checkout,
          include: [Book]
        }
      });
  
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      res.json(student);
    } catch (error) {
      console.error('Error fetching student:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

// Route to search for who borrowed a specific book (search by book title)
app.get('/search/book', async (req, res) => {
  const bookTitle = req.query.title.trim();

  const book = await Book.findOne({
    where: { title: bookTitle },
    include: {
      model: Checkout,
      include: [Student]
    }
  });

  if (!book) {
    return res.status(404).send('Book not found');
  }

  res.json(book);  // Send back the book data with its borrowers
});

app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.originalUrl}`);
    next();
});
  
app.get('/test', (req, res) => {
    res.json({ message: 'Test route works!' });
});
  

// Start the server
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Library management system is running on http://localhost:${port}`);
  });
});
