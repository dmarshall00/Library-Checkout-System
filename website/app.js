const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const { sequelize, Student } = require('./models/LibraryMgmtModels');  // Import sequelize models

const app = express();
const port = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));  // For parsing form data
app.set('view engine', 'ejs');  // Set EJS as the templating engine
app.use(express.static('public'));  // Serve static files (e.g., CSS, images)

app.use(session({
  secret: 'your-secret-key',  // Secret for session encryption
  resave: false,
  saveUninitialized: false,
}));

// Routes

// Home page (index.ejs)
app.get('/', (req, res) => {
  res.render('index');  // Render the home page
});

// Registration page
app.get('/register', (req, res) => {
  res.render('register');  // Render the registration form
});

// Registration logic
app.post('/register', async (req, res) => {
  const { student_name, student_group, password } = req.body;

  // Hash the password before saving it
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the student in the database
  try {
    await Student.create({
      student_name,
      student_group,
      password: hashedPassword,  // Save the hashed password
    });
    res.redirect('/login');  // Redirect to login page after successful registration
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating user');
  }
});

// Login page
app.get('/login', (req, res) => {
  res.render('login');  // Render the login form
});

// Login logic
app.post('/login', async (req, res) => {
  const { student_name, password } = req.body;

  // Find the student by name
  const student = await Student.findOne({ where: { student_name } });

  if (student && await bcrypt.compare(password, student.password)) {
    // Store student info in session if login is successful
    req.session.student = student;
    res.redirect('/dashboard');  // Redirect to dashboard if login is successful
  } else {
    res.status(401).send('Invalid login credentials');
  }
});

// Dashboard page
app.get('/dashboard', (req, res) => {
  if (!req.session.student) {
    return res.redirect('/login');  // Redirect to login if the user is not logged in
  }

  res.render('dashboard', { student: req.session.student });  // Render dashboard page
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');  // Redirect to home after logout
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

