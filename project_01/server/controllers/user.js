import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        if(!fullName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!",
            });
        }

        // check if email already exists
        const user = await User.findOne({email});

        if(user) {
            return res.status(200).json({
                success: false,
                message: "User already registered!"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullName,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully."
        });
    } catch (error) {
        console.log(error);
    }
};

export const login = async (req, res) => {
    try {
        // res.set("myHeaderKey", "myCustomHeaderValue");  // set header sent from the server
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!"
            });
        }

        const user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password!"
            });
        }

        const doesPasswordMatch = await bcrypt.compare(password, user.password);

        if(!doesPasswordMatch) {
            res.status(400).json({
                success: false,
                message: "Incorrect email or password!"
            });
        }

        const jwtToken = await jwt.sign({userId: user._id}, process.env.SECRET_KEY, {expiresIn: "1d"});

        // without jwt token
        /* return res.status(200).json({
            success: true,
            message: `Welcome back ${user.fullName}`
        }); */

        // with jwt token
        return res.status(200).cookie("token", jwtToken, {
            httpOnly: true, 
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        }).json({
            success: true,
            message: `Welcome back ${user.fullName}`
        });
    } catch (error) {
        console.log(error);
    }
};

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge: 0}).json({
            success: true,
            message: "User logged out successfully."
        });
    } catch (error) {
        console.log(error);
    }
};