module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    }, {
      timestamps: true, // Sequelize will automatically handle createdAt and updatedAt
    });
  
    return User;
  };
  