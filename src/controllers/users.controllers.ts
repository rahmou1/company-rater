import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/user.model';

const userModel = new UserModel();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.create(req.body);
    res.json({
      status: 'true',
      data: { ...user },
      message: 'User Created Successfully 👌',
    });
  } catch (error) {
    next(error);
  }
};
