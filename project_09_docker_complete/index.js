import express from "express";

const app = express();
const PORT = 8000;

app.get("/products", (req, res) => {
    return res.status(200).json([
        { id: 1, name: "product 1", price: 100 },
        { id: 2, name: "product 2", price: 200 },
        { id: 3, name: "product 3", price: 300 },
        { id: 4, name: "product 4", price: 400 },
    ])
});

app.listen(PORT, () => {
    console.log("server started...");
})