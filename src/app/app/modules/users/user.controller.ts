import { Request, Response } from 'express';
import { UserServices } from './user.services';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body.user;
    const result = await UserServices.userToDatabase(user);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getUsersFromDatabase();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const result = await UserServices.getSingleUserFromDatabase(userId);
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const UserController = {
  createUser,
  getUsers,
  getSingleUser,
};
