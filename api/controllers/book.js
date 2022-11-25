const Book = require("../models/books");

exports.getAllBooks = async (req, res) => {
  try {
    res.status(200).json({ msg: "Inside get all books" });
  } catch (error) {
    res.json(500).json({ msg: "Internal Server Error" });
  }
};
exports.getBookById = async (req, res) => {
  try {
    res.status(200).json({ msg: "Inside get  book by Id" });
  } catch (error) {
    res.json(500).json({ msg: "Internal Server Error" });
  }
};

exports.getBookByUser = async (req, res) => {
  try {
    res.status(200).json({ msg: "Inside get all books by user" });
  } catch (error) {
    res.json(500).json({ msg: "Internal Server Error" });
  }
};

exports.getBooksByWriter = async (req, res) => {
  try {
    res.status(200).json({ msg: "Inside get all books by writer" });
  } catch (error) {
    res.json(500).json({ msg: "Internal Server Error" });
  }
};

exports.newBook = async (req, res) => {
  try {
    res.status(200).json({ msg: "Inside new book" });
  } catch (error) {
    res.json(500).json({ msg: "Internal Server Error" });
  }
};
exports.getBooksByName = async (req, res) => {
  try {
    res.status(200).json({ msg: "Inside books by name" });
  } catch (error) {
    res.json(500).json({ msg: "Internal Server Error" });
  }
};
