import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();

interface CustomRequest extends Request {
  user?: object;
}

const verifyJWT = (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader: any = req.headers.authorization || req.headers.Authorization || req.headers.token;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authenticated.' });
  }

  const token = authHeader.split(' ')[1];
  const secret: string = process.env.JWT_SECRET || 'JWT_SECRET_KEY';

  jwt.verify(token, secret, (err: any, decoded: any) => {
    if (err) {
      return res.status(403).json({ message: err.message }); // invalid token
    }

    if (decoded) {
      req.user = decoded.user;
      next();
    } else {
      return res.status(403).json({ message: 'Invalid token payload.' });
    }
  });
};

export default verifyJWT;
