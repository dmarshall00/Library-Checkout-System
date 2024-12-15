const { Sequelize, DataTypes, Op } = require('sequelize');  // <-- Import Op here

// Initialize Sequelize connection
const sequelize = new Sequelize('library_mgmt', 'root', 'MyFamily01!', {
  host: 'localhost',
  dialect: 'mysql',
});

// Define Student Model
const Student = sequelize.define('Student', {
  student_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  student_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  student_group: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'students',
  timestamps: false,
});

// Define Book Model
const Book = sequelize.define('Book', {
  isbn: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
}, {
  tableName: 'books',
  timestamps: false,
});

// Define Checkout Model
const Checkout = sequelize.define('Checkout', {
  checkout_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  checkout_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  return_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  book_isbn: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  student_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'checkouts',
  timestamps: false,
});

// Associations
Student.hasMany(Checkout, {
  foreignKey: 'student_id',
});
Checkout.belongsTo(Student, {
  foreignKey: 'student_id',
});

Book.hasMany(Checkout, {
  foreignKey: 'book_isbn',
});
Checkout.belongsTo(Book, {
  foreignKey: 'book_isbn',
});

// Exporting models
module.exports = { sequelize, Student, Book, Checkout, Op }; // Export Op here
