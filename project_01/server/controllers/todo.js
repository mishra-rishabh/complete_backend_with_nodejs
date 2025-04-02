import { Todo } from "../models/todo.js";

export const createTodo = async (req, res) => {
    try {
        const { title, description } = req.body;

        if(!title || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!"
            });
        }

        const todo = new Todo({title, description, isCompleted: false});

        todo.save();

        return res.status(201).json({
            success: true,
            message: "Todo created successfully",
            todo
        });
    } catch (error) {
        console.log(error);
    }
};

export const getAllTodo = async (req, res) => {
    try {
        const allTodos = await Todo.find();
        
        return res.status(200).json({
            success: true,
            allTodos
        });
    } catch (error) {
        console.log(error);
    }
};

export const updateTodo = async (req, res) => {
    try {
        const todoId = req.params.todoId;
        const { title, description, isCompleted } = req.body;
        const todo = await Todo.findByIdAndUpdate(todoId, {title, description, isCompleted}, {new: true});

        return res.status(200).json({
            success: true,
            message: "Todo updated",
            todo
        });
    } catch (error) {
        console.log(error);
    }
};

export const deleteTodo = async (req, res) => {
    try {
        const todoId = req.params.todoId;

        await Todo.findByIdAndDelete(todoId);

        return res.status(200).json({
            success: true,
            message: "Todo deleted"
        });
    } catch (error) {
        console.log(error);
    }
};