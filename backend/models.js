const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://root:your_password@localhost:3306/library_mgmt');

// Define User Model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'users',
  timestamps: false  // Disable automatic timestamp fields
});

module.exports = { sequelize, User };
