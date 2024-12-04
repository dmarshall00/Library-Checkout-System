
const prompt = require('prompt-sync')();
const { Sequelize, DataTypes } = require('sequelize');

// Database connection
const sequelize = new Sequelize('library_mgmt', 'root', 'Place_Your_Password for your mySQL connection', { 
  host: 'localhost',
  dialect: 'mysql' // or 'postgres', 'sqlite', etc.
});

// Define your model
const Student = sequelize.define('students', {
  student_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,    // Set student_id as primary key
    autoIncrement: true  // Make it auto-increment
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Add other fields as needed (group, etc.)
}, {
  tableName: 'students', // Ensure the correct table name is used
  timestamps: false       // Disable createdAt and updatedAt fields
});

async function main() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Gather input from the user (prompt for student_id)
    const student_id = prompt('Enter the student ID: ');

    // Query the database (searching by student_id)
    const student = await Student.findOne({ where: { student_id: student_id } });

    if (student) {
      console.log('Student information:', student.toJSON());
    } else {
      console.log('Student not found.');
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
}

main();
