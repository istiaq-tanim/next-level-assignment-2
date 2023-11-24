import { Request, Response } from 'express';
import { UserServices } from './user.services';
import userValidationSchema from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body.user;

    const zodParseData = userValidationSchema.parse(user)

    const result = await UserServices.userToDatabase(zodParseData);
    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    });
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    });
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: {
        "code": 404,
        "description": error.message
      }
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body
    const { userId } = req.params

    const result = await UserServices.updateUserToDatabase(userId, userData)
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: {
        "code": 404,
        "description": error.message
      }
    });
  }
}

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await UserServices.deleteUserFromDataBase(userId)
    res.status(200).json({
      success: true,
      message: 'User Deleted successfully!',
      data: null,
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: {
        "code": 404,
        "description": error.message
      }
    });
  }
}

const createProduct = async (req: Request, res: Response) => {
  try {
    const userData = req.body
    const { userId } = req.params
    const result = await UserServices.createOrderToDatabase(userId, userData)
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: null,
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: {
        "code": 404,
        "description": error.message
      }
    });
  }
}
const getUserOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await UserServices.getOrder(userId)
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: {
        "code": 404,
        "description": error.message
      }
    });
  }
}
export const UserController = {
  createUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  createProduct,
  getUserOrder
};
