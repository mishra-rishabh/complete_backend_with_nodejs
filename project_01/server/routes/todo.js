import express from "express";
import { createTodo, deleteTodo, getAllTodo, updateTodo } from "../controllers/todo.js";
import isAuthenticated from "../middleware/authenticate.js";

const router = express.Router();

router.route("/create").post(isAuthenticated, createTodo);
router.route("/allTodo").get(getAllTodo);
router.route("/updateTodo/:todoId").put(isAuthenticated, updateTodo);
router.route("/deleteTodo/:todoId").delete(isAuthenticated, deleteTodo);

export default router;