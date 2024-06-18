import { NextFunction, Request, Response } from "express";
import UserSchema from "./TodoSchema";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import config from "../config/config";
import { AuthRequest } from "../middlewares/authenticate";
import TodoSchema from "./TodoSchema";

const getAllTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todos = await TodoSchema.find()
      .populate("user")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      status: true,
      data: todos,
    });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const getTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todoId = req.params["id"];
    const todo = await TodoSchema.findById(todoId);

    return res.status(200).json({
      status: true,
      data: todo,
    });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const addTodo = async (req: Request, res: Response, next: NextFunction) => {
  const { title, description, user, status } = req.body;

  if (!title || !description || !user || !status) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const todo = await TodoSchema.create({
      title,
      description,
      user,
      status,
    });

    return res.status(201).json({
      status: true,
      message: "Todo created",
      data: todo,
    });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
  const { title, description, user, status } = req.body;
  const todoId = req.params["id"];

  if (!title || !description || !user || !status) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const todo = await TodoSchema.updateOne(
      {
        _id: todoId,
      },
      {
        title,
        description,
        user,
        status,
      }
    );

    return res.status(200).json({
      status: true,
      message: "Todo updated",
      data: todo,
    });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todoId = req.params["id"];
    await TodoSchema.deleteOne({ _id: todoId });

    return res.status(200).json({
      status: true,
      message: "Todo deleted",
    });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export { getAllTodo, addTodo, updateTodo, getTodo, deleteTodo };
