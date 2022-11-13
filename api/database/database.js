const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.database,
  process.env.databaseUser,
  process.env.databasePassword,
  {
    dialect: "mysql",
  }
);

module.exports = sequelize;
