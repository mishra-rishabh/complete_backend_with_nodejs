const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const router = express.Router();

router.get("/welcome", authMiddleware, (req, res) => {
    const { username, userId, role } = req.userInfo;

    res.json({
        message: "Welcome to the homepage",
        user: {
            _id: userId,
            username,
            role
        }
    });
});

module.exports = router;