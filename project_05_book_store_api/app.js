require("dotenv").config();
const express = require("express");
const connectDatabase = require("./database/db.js");
const bookRouter = require("./routes/book.routes.js")

const app = express();


const PORT = process.env.PORT || 3000;

// connect to database
connectDatabase();

// middleware -> express.json()
app.use(express.json());

// routes
app.use("/api/books", bookRouter);

app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`);
});