import { Request, Response } from 'express';

export const AsyncHandler = (fn: any) => {
  return async (req: Request, res: Response) => {
    try {
      await fn(req, res);
    } catch (error: any) {
      console.log(error);
      res.status(500).json({
        status: 'error',
        message: error.errors ? error.errors : error.message,
      });
    }
  };
};
