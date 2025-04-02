import express from "express";
import { login, logout, registerUser } from "../controllers/user.js"

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(login);
router.route("/logout").get(logout);

export default router;