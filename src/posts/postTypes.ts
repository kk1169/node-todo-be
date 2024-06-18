import { User } from '../users/userTypes';

export interface Post {
  _id: string;
  message: string;
  image: string;
  user: User;
}

export interface Comment {
  _id: string;
  message: string;
  user: string;
}
