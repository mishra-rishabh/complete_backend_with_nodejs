require("dotenv").config();
const express = require("express");
const connectToDatabase = require("./database/db.js");
const routes = require("./routes/routes.js");
const homeRoutes = require("./routes/home-routes.js");
const adminRoutes = require("./routes/admin-routes.js");

connectToDatabase();

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.json());

// routers
app.use("/api/auth", routes);
app.use("/api/home", homeRoutes);
app.use("/api/admin", adminRoutes);

app.listen(PORT, () => {
    console.log("Server started at PORT ", PORT);
});