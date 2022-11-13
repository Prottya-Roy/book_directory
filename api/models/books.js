const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const Book = sequelize.define("problem", {
  bookID: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING(1000),
    allowNull: false,
  },
});

module.exports = Book;
