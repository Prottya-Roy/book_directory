const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyparser = require("body-parser");
const cors = require("cors");

const bookRoutes = require("./api/routes/book");
const userRoutes = require("./api/routes/user");
const errorHandler = require("./api/middlewares/errorhandler");

app.use(morgan("dev"));
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    next(err);
  });
};

app.use("/book", catchAsync(bookRoutes));
app.use("/user", catchAsync(userRoutes));

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use(errorHandler);

module.exports = app;
