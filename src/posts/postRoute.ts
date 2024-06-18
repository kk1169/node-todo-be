import express from 'express';
import { addPost } from './postController';

const postRoute = express.Router();

postRoute.post('/', addPost);

export default postRoute;
