import express from "express";
import {
  getAllTodo,
  addTodo,
  updateTodo,
  getTodo,
  deleteTodo,
} from "./TodoController";
import authenticate from "../middlewares/authenticate";

const TodoRoute = express.Router();

TodoRoute.get("/", getAllTodo);
TodoRoute.get("/:id", getTodo);
TodoRoute.post("/", addTodo);
TodoRoute.put("/:id", updateTodo);
TodoRoute.delete("/:id", deleteTodo);

export default TodoRoute;
