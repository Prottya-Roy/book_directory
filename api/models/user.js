const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const User = sequelize.define(
  "user",
  {
    userID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    },
    dOB: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    lastSeen: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    defaultScope: {
      attributes: { exclude: ["password"] },
    },
    scopes: {
      withPassword: {
        attributes: {},
      },
    },
  }
);

module.exports = User;
