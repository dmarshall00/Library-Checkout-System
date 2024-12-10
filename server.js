require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");
const { User } = require("./backend/models");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./frontend"));

// Set up sessions
app.use(session({
  SESSION_SECRET=your_secure_random_secret
  secret: process.env.SESSION_SECRET || '085gbjgd568%%$dS', // Use an env variable for better security
  resave: false,
  saveUninitialized: true,
}));

// Register Route
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("All fields are required!");
  }

  // Hash password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await User.create({
      username,
      password: hashedPassword,
    });
    res.redirect("./frontend/login.html");
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(400).send("Username already exists.");
    } else {
      res.status(500).send("Registration failed.");
    }
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.status(400).send("Incorrect username or password.");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).send("Incorrect username or password.");
  }

  // Store session on successful login
  req.session.user = user.username;
  res.redirect("/dashboard"); // redirect to dashboard.html
});

// Dashboard Route
app.get('/dashboard', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.sendFile(__dirname + '/frontend/dashboard.html');  // Serve static HTML
});

// Route to get the session data (username)
app.get('/get-user', (req, res) => {
  if (req.session.user) {
    return res.json({ username: req.session.user });
  }
  return res.status(401).json({ username: null });
});

// Logout Route
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Could not log out.");
    }
    res.redirect("/login");
  });
});

// Start Server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
});
