# Library Checkout System

This is a Library Checkout System built with **Node.js**, **Express**, **Sequelize**, and **MySQL**. It allows users to manage book checkouts, registrations, and view a dashboard.

## Prerequisites

To run this project locally, you need to have the following installed:

- **Node.js** (version 14 or later)
- **npm** (Node Package Manager)
- **MySQL** (for the database)
- **Git** (optional, for cloning the repository)

## Setup Instructions

### 1. Download all Files

To get started, download all of the files inside this branch (or clone this repository to your local machine if that is quicker)

```bash
git clone https://github.com/dmarshall00/Library-Checkout-System.git
cd Library-Checkout-System
```

### 2. Install Dependencies

Make sure you're in the project directory where all your downloaded files are, and then run the following command to install the required Node.js dependencies:

```bash
npm install
```

This will install all the necessary packages defined in `package.json`. 

Since the Node.js server is running locally on your computer (specifically on http://localhost:3000) and you'll be opening the files directly in your browser, you may run into CORS (Cross-Origin Resource Sharing) issues and the system may not work properly. To prevent this scenario, be sure to download the cors middleware in the same directory as your downloaded files:

```bash
npm install cors
```

### 3. Turn on you MySQL Environment

This project heavily interacts with the database files to present you with stored library information, so be sure to turn on your MySQL server before running the program


### 4. Set Up the Database

Create the necessary tables in your MySQL database by running the migrations. If you're using Sequelize, you can run the following command to sync the database:

```bash
npx sequelize-cli db:migrate
```

If you're not using Sequelize, ensure your database tables are set up manually by running the necessary SQL commands. Refer to the model definitions for the correct table structure.

### 5. Running the Application

- **Create `.env` file**: Copy `.env.example` to `.env` and fill in the necessary values.

Once the environment is set up, you can start the application by using Sequelize:

```bash
node server.js
```

The application will run on `http://localhost:3000` by default and notify you that the server is running.

### 6. Access the Application

Once the application is running, go to your files and open the "login.html" file you downloaded earlier. This will take you to the login page of the Library Checkout System.


- You can create a new user account by visiting the **Register** link.
- After registering, you can log in and view the book checkouts via the **Dashboard**.
- You will be able to see the list of books, students, books that have been checked out and when they're due to return.

### 7. Stopping the Server

To stop the application, press `Ctrl + C` in the terminal where you typed "node server.js" to run the program.



## Contributing

If you'd like to contribute to this project, feel free to open a pull request or create an issue. Contributions are always welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
