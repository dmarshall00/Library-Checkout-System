const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root", // Replace with your MySQL username
  password: "9820jajdn5$$H", // Replace with your MySQL password
  database: "library_mgmt", // Your database name
});

const User = require("./user")(sequelize, DataTypes);

module.exports = { sequelize, User };
