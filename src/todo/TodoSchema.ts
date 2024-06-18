import mongoose from "mongoose";
import { Todo } from "./TodoTypes";

const TodoSchema = new mongoose.Schema<Todo>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    user: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<Todo>("Todo", TodoSchema);
