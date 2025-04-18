const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    // console.log(authHeader);
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) {
        return res.status(401).json({
            success: false,
            message: "Access denied!"
        });
    }

    // decode the token
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // console.log(decodedToken);

        req.userInfo = decodedToken;
        
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong!"
        });
    }
};

module.exports = authMiddleware;