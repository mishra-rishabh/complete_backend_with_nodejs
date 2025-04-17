const Book = require("../models/book.model.js");

const getAllBooks = async (req, res) => {
    try {
        const allBooks = await Book.find();

        if(allBooks.length > 0) {
            res.status(200).json({
                success: true,
                message: "All books fetched successfully",
                data: allBooks,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: "No books found!",
                data: [],
            });
        }
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Something went wrong!",
        });
    }
};

const getBookById = async (req, res) => {
    const bookId = req.params.id;
    const bookDetails = await Book.findById(bookId);

    if(!bookDetails) {
        return res.status(404).json({
            success: false,
            message: "Book not found!",
        });
    }

    res.status(200).json({
        success: true,
        data: bookDetails,
    });
};

const addNewBook = async (req, res) => {
    try {
        const bookDetails = req.body;
        const newBook = await Book.create(bookDetails);
        // console.log(newBook);
        
        if(newBook) {
            res.status(201).json({
                success: true,
                message: "Book added successfully",
                data: newBook,
            });
        }
    } catch (error) {
        console.log(error);
    }
};

const updateBook = async (req, res) => {
    try {
        const updatedBookDetails = req.body;
        const bookId = req.params.id;
        const updatedBook = await Book.findByIdAndUpdate(bookId, updatedBookDetails, {new: true});

        if(!updatedBook) {
            res.status(404).json({
                success: false,
                message: "Book not found!",
            });
        }

        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: updatedBook,
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Something went wrong!"
        });
    }
};

const deleteBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const deletedBook = await Book.findByIdAndDelete(bookId);

        if(!deletedBook) {
            res.status(404).json({
                success: false,
                message: "Book not found!",
            });
        }

        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: deletedBook,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Something went wrong!"
        });
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    addNewBook,
    updateBook,
    deleteBook,
}
