const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize connection
const sequelize = new Sequelize('library_mgmt', 'root', 'Ejbsy051cab', { 
  host: 'localhost',
  dialect: 'mysql'
});

// Define Student Model
const Student = sequelize.define('Student', {
  student_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  student_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  student_group: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'students',
  timestamps: false
});

// Define Book Model
const Book = sequelize.define('Book', {
  isbn: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rating: {
    type: DataTypes.DECIMAL,
    allowNull: false
  }
}, {
  tableName: 'books',
  timestamps: false
});

// Define Checkout Model
const Checkout = sequelize.define('Checkout', {
  checkout_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  checkout_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  return_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  book_isbn: {
    type: DataTypes.STRING,  // book_isbn in Checkout will reference ISBN in Book
    allowNull: false
  },
  student_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'checkouts',
  timestamps: false
});


// Associations
Student.hasMany(Checkout, {
  foreignKey: 'student_id',  // student_id in Checkout references student_id in Student
});
Checkout.belongsTo(Student, {
  foreignKey: 'student_id',
});

Book.hasMany(Checkout, {
  foreignKey: 'book_isbn',  // book_isbn in Checkout references ISBN in Book
});
Checkout.belongsTo(Book, {
  foreignKey: 'book_isbn',  // Ensure book_isbn in Checkout references ISBN in Book
});

module.exports = { sequelize, Student, Book, Checkout };
