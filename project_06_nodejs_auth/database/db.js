const mongoose = require("mongoose");

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database Connected");
    } catch (error) {
        console.log("Failed to connect database!");
        process.exit(1);
    }
};

module.exports = connectToDatabase;