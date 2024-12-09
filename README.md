
# Library Checkout System

This is a Library Checkout System built with **Node.js**, **Express**, **Sequelize**, and **MySQL**. It allows users to manage book checkouts, registrations, and view a dashboard.

## Prerequisites

To run this project locally, you need to have the following installed:

- **Node.js** (version 14 or later)
- **npm** (Node Package Manager)
- **MySQL** (for the database)
- **Git** (optional, for cloning the repository)

## Setup Instructions

### 1. Clone the Repository

To get started, clone this repository to your local machine:

```bash
git clone https://github.com/dmarshall00/Library-Checkout-System.git
cd Library-Checkout-System
```

### 2. Install Dependencies

Make sure you're in the project directory, and then run the following command to install the required Node.js dependencies:

```bash
npm install
```

This will install all the necessary packages defined in `package.json`.

### 3. Set Up Your Environment

This project uses environment variables to store sensitive data like database credentials and session secrets. You need to create an `.env` file in the root directory of the project.

- **Create `.env` file**: Copy `.env.example` to `.env` and fill in the necessary values.

Example `.env` file:
```
DATABASE_URL=mysql://username:password@localhost:3306/dbname
SESSION_SECRET=your_secret_key_here
PORT=3000
```

Replace:
- `username` and `password` with your MySQL database credentials.
- `dbname` with the name of your database.
- `your_secret_key_here` with a strong, random session secret.

### 4. Set Up the Database

Create the necessary tables in your MySQL database by running the migrations. If you're using Sequelize, you can run the following command to sync the database:

```bash
npx sequelize-cli db:migrate
```

If you're not using Sequelize, ensure your database tables are set up manually by running the necessary SQL commands. Refer to the model definitions for the correct table structure.

### 5. Running the Application

Once the environment is set up, you can start the application with the following command:

```bash
npm start
```

The application will run on `http://localhost:3000` by default, but you can change the port in the `.env` file by setting the `PORT` variable.

### 6. Access the Application

Once the application is running, open your browser and visit `http://localhost:3000` to access the Library Checkout System.

- You can create a new user account by visiting the **Register** page.
- After registering, you can log in and manage the book checkouts via the **Dashboard**.

### 7. Stopping the Server

To stop the application, press `Ctrl + C` in the terminal where the app is running.

## Troubleshooting

### Error: **"Module not found"**

If you encounter a "Module not found" error, make sure to run `npm install` to ensure all dependencies are installed.

### Error: **"Database connection failed"**

- Check that your MySQL server is running.
- Ensure the credentials in the `.env` file are correct.
- Verify that the database exists.

## Contributing

If you'd like to contribute to this project, feel free to open a pull request or create an issue. Contributions are always welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
