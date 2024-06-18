import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import postSchema from './postSchema';

const addPost = async (req: Request, res: Response, next: NextFunction) => {
  const { message, user } = req.body;

  // Validation
  if (!message || !user) {
    const error = createHttpError(400, 'All fields are required');
    return next(error);
  }

  try {
    const addPost = await postSchema.create({
      message,
      user,
    });

    res.status(201).json({
      status: true,
      message: 'Post added',
      data: addPost,
    });
  } catch (error) {
    return next(createHttpError(500, 'Something went wrong'));
  }
};

export { addPost };
