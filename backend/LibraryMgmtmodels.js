require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

// Database Connection
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT || 'mysql',  // Add default dialect
    }
);

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
}, { timestamps: false });

// Define Book Model
const Book = sequelize.define('Book', {
    isbn: {
        type: DataTypes.STRING,
        primaryKey: true,
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
        type: DataTypes.DECIMAL(3, 2),
        allowNull: false,
    },
}, { tableName: 'books', timestamps: false });

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
        allowNull: true,
    },
    book_isbn: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Book,
            key: 'isbn',
        },
    },
    student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Student,
            key: 'student_id',
        },
    },
}, { tableName: 'checkouts', timestamps: false });

// Associations
Student.hasMany(Checkout, { foreignKey: 'student_id' });
Checkout.belongsTo(Student, { foreignKey: 'student_id' });

Book.hasMany(Checkout, { foreignKey: 'book_isbn' });
Checkout.belongsTo(Book, { foreignKey: 'book_isbn' });

// Export Models
module.exports = { sequelize, Student, Book, Checkout };
