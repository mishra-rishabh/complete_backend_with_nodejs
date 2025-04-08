let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
const enquiryRouter = require("./app/routes/web/enquiryRoutes.js");
require("dotenv").config();

let app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/website/enquiry", enquiryRouter);


// connect to mongodb
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Database Connected...");

    app.listen(process.env.PORT || 3000, () => {
        console.log("Server started at port ", process.env.PORT);
    });
}).catch((err) => {
    console.log(err);
});