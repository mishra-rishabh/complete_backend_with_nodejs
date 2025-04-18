const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const checkExistingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (checkExistingUser) {
            return res.status(400).json({
                success: false,
                message: "user already exists with either same email or username!",
            });
        }

        // hash user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: role || "user"
        });

        await newUser.save();

        if (newUser) {
            res.status(201).json({
                success: true,
                message: "User registered successfully",
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Unable to register user!",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong!"
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        // console.log(username, password);

        const user = await User.findOne({ username });
        // console.log(user);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exists!",
            });
        }

        const isPasswordMatching = await bcrypt.compare(password, user.password);

        if (!isPasswordMatching) {
            return res.status(400).json({
                success: false,
                message: "Invalid username or password!",
            });
        }

        const accessToken = jwt.sign({
            userId: user._id,
            username: user.username,
            role: user.role
        }, process.env.JWT_SECRET_KEY, { expiresIn: "15m" });

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            accessToken
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong!"
        });
    }
};

const changePassword = async (req, res) => {
    try {
        const userId = req.userInfo.userId;
        const { oldPassword, newPassword } = req.body;

        const user = await User.findById(userId);

        if(!user) {
            return res.status(400).json({
                success: false,
                message: "User not found!"
            });
        }

        const isOldPasswordMatched = await bcrypt.compare(oldPassword, user.password);

        if(!isOldPasswordMatched) {
            return res.status(400).json({
                success: false,
                message: "Old password is not correct!"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const newHashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = newHashedPassword;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Password changed successfully"
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
    registerUser,
    loginUser,
    changePassword,
}