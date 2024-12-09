const prompt = require('prompt-sync')();  // For reading user input

const { sequelize, Student, Book, Checkout } = require('./LibraryMgmtmodels');  // Import models

// Function to get borrowed books for a student by their ID or name
async function getBorrowedBooksByStudent() {
  const studentInput = prompt('Enter student ID or first name: ').trim();  // Ask for student ID or name

  // Try to parse the input as a number (student ID)
  const studentId = parseInt(studentInput, 10);
  let student = null;

  // Check if the input is a valid student ID, or if it's a name, search by first name
  if (!isNaN(studentId)) {
    student = await Student.findOne({
      where: { student_id: studentId },
      include: {
        model: Checkout,
        include: [Book]
      }
    });
  } else {
    // Try to find the student by matching the first name part of the student_name
    student = await Student.findOne({
        where: sequelize.literal(`SUBSTRING_INDEX(student_name, ' ', 1) = '${studentInput}'`),
      include: {
        model: Checkout,
        include: [Book]
      }
    });
  }

  // If student not found, show a message
  if (!student) {
    console.log('Student not found. Please check the name or ID.');
    return;
  }

  console.log(`${student.student_name} in Group ${student.student_group},  Borrowed Books:`);

  // Check if the student has any borrowed books
  if (student.Checkouts.length === 0) {
    console.log('No books borrowed yet.');
  } else {
    // Display borrowed books
    student.Checkouts.forEach(checkout => {
      console.log(`- ${checkout.Book.title} by ${checkout.Book.author}`);
      console.log(`  Borrowed on: ${checkout.checkout_date}`);
      console.log(`  Due for return on: ${checkout.return_date}`);
      console.log('---');
    });
  }
}

// Function to get information about who borrowed a specific book
async function getBookBorrowInfo() {
  const bookTitle = prompt('Enter book title: ');  // Ask for the book title

  // Find the book based on the title
  const book = await Book.findOne({
    where: { title: bookTitle },
    include: {
      model: Checkout,
      include: [Student]
    }
  });

  // If book not found, show a message
  if (!book) {
    console.log('Book not found.');
    return;
  }

  console.log(`Borrowers of "${book.title}":`);

  // Check if the book has any checkouts (borrowers)
  if (book.Checkouts.length === 0) {
    console.log('No one has borrowed this book yet.');
  } else {
    // Display the students who borrowed the book
    book.Checkouts.forEach(checkout => {
      console.log(`- ${checkout.Student.student_name}`);
      console.log(`  Group: ${checkout.Student.student_group}`);
      console.log(`  Borrowed on: ${checkout.checkout_date}`);
      console.log(`  Due for return on: ${checkout.return_date}`);
      console.log('---');
    });
  }
}

// Main function to run the application
async function main() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Ask user to choose whether they want to search by student or book
    const option = prompt('Do you want to search by (1) Student or (2) Book? (Enter 1 or 2): ');

    if (option === '1') {
      await getBorrowedBooksByStudent();  // If option is 1, get books borrowed by student
    } else if (option === '2') {
      await getBookBorrowInfo();  // If option is 2, get borrowed information for a book
    } else {
      console.log('Invalid option. Please enter 1 or 2.');
    }

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close();  // Close the database connection when done
  }
}

main();  // Run the main function
