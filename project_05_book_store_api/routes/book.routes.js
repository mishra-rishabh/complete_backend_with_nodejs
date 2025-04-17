const express = require("express");
const {
    getAllBooks,
    getBookById,
    addNewBook,
    updateBook,
    deleteBook
} = require("../controllers/book.controller.js");

// create express router
const bookRouter = express.Router();

// routes
bookRouter.get("/get-all", getAllBooks);
bookRouter.get("/get/:id", getBookById);
bookRouter.post("/add", addNewBook);
bookRouter.put("/update/:id", updateBook);
bookRouter.delete("/delete/:id", deleteBook);

module.exports = bookRouter;