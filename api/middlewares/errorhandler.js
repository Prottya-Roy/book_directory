module.exports = (error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      returning_from: "Error handler",
      message: error.message,
    },
  });
};
