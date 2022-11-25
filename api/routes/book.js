const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book");

router.get("/", bookController.getAllBooks);
router.get("/byID/:bookID", bookController.getBookById);
router.get("/byUser/:userID", bookController.getBookByUser);
router.get("/byWriter/:writerName", bookController.getBooksByWriter);
router.get("/byName/:title", bookController.getBooksByName);
router.post("/", bookController.newBook);

module.exports = router;
