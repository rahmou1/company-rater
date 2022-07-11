import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/user.model';

const userModel = new UserModel();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userModel.create(req.body);
    res.json({
      status: 'true',
      data: { ...users },
      message: 'User Created Successfully 👌',
    });
  } catch (error) {
    next(error);
  }
};

export const getMany = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userModel.getMany();
    res.json({
      status: 'true',
      data: users,
      message: 'Users retrieved successfully 👌',
    });
  } catch (error) {
    next(error);
  }
};

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userModel.getOne(req.params.id as unknown as string);
    res.json({
      status: 'true',
      data: users,
      message: 'Users retrieved successfully 👀',
    });
  } catch (error) {
    next(error);
  }
};

export const updateOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userModel.updateOne(req.body);
    res.json({
      status: 'true',
      data: users,
      message: 'User Updated Successfully 🤪',
    });
  } catch (error) {
    next(error);
  }
};

export const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userModel.deleteOne(req.params.id as unknown as string);
    res.json({
      status: 'true',
      data: users,
      message: 'User Deleted Successfully 😘',
    });
  } catch (error) {
    next(error);
  }
};
