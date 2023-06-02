import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import { AsyncHandler } from '../utils/AsyncHundler';

import User from '../models/User';

// const { JWT_SECRET_KEY } = process.env;
const JWT_SECRET_KEY: Secret = process.env.JWT_SECRET_KEY || 'JWT_SECRET_KEY';

export const register = AsyncHandler(async (req: Request, res: Response) => {
  const { names, username, password, telphone, email, role } = req.body;

  // validate the inputs

  if (!names || !username || !password || !telphone) {
    return res.status(400).json({ status: 'error', message: 'names, username, password,telphone are requiled' });
  }

  // Check if the user already exists
  const existingUser = await User.findOne({ username }).exec();
  if (existingUser) {
    return res.status(409).json({ status: 'error', message: 'User already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const user = await User.create({ names, username, telphone, email, password: hashedPassword, role });

  // Generate a JWT token
  const token = jwt.sign({ user }, JWT_SECRET_KEY, { expiresIn: '30m' });

  res.status(201).json({ status: 'Ok', data: { user, token } });
});

export const login = AsyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Check if the user exists
  const user = await User.findOne({ username }).exec();
  if (!user) {
    return res.status(401).json({ status: 'error', message: 'user not registered' });
  }

  // Validate the password
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ status: 'error', message: 'Invalid password' });
  }

  // Generate a JWT token
  const token = jwt.sign({ user }, JWT_SECRET_KEY, { expiresIn: '30m' });

  res.status(200).json({ status: 'success', data: { user, token } });
});
