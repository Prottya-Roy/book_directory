const http = require("http");
const app = require("./app");
const sequelize = require("./api/database/database");

const User = require("./api/models/user");
const Book = require("./api/models/books");

const port = process.env.PORT || 1111;
const server = http.createServer(app);

User.hasMany(Book);
const startServer = async (server) => {
  await sequelize.authenticate();
  await sequelize
    .sync({
      // force: true,
    })
    .then((result) => {
      console.log(result);
    });
  server.listen(port, () => {
    console.log("Server Started...");
  });
};

startServer(server);
