import { User } from "../users/UserTypes";

export type TodoStatus = "Open" | "Progress" | "Testing" | "Done";

export interface Todo {
  _id: string;
  title: string;
  description: string;
  user: User;
  status: TodoStatus;
}
