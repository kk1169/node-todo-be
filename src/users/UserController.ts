import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import UserSchema from './UserSchema';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import config from '../config/config';
import { AuthRequest } from '../middlewares/authenticate';

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const user = await UserSchema.findOne({ email });
  if (user) {
    return res.status(400).json({ error: 'User already exists.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserSchema.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      status: true,
      message: 'User created',
      data: { _id: newUser._id, email: newUser.email },
    });
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const user = await UserSchema.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: 'User not found.' });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(400).json({ error: 'Incorrect credentials.' });
  }

  try {
    const token = sign({ sub: user._id }, config.jwtSecret as string, {
      expiresIn: '1d',
    });

    return res.status(200).json({
      status: true,
      message: 'User loggedin',
      data: { _id: user._id, email: user.email, name: user.name },
      token,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

const me = async (req: Request, res: Response, next: NextFunction) => {
  const _request = req as AuthRequest;
  const user = await UserSchema.findById(_request.userId);
  if (user) {
    return res.status(200).json({
      status: true,
      data: { _id: user._id, email: user.email, name: user.name },
    });
  }

  return res.status(500).json({ error: 'Something went wrong' });
};

export { register, login, me };
