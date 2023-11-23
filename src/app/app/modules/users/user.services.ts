import { User } from './../user.model';
import { TUser } from './user.interface';
const userToDatabase = async (user: TUser) => {
  const result = await User.create(user);
  return result;
};

const getUsersFromDatabase = async () => {
  const result = await User.find();
  return result;
};

const getSingleUserFromDatabase = async (userId: string) => {
  const result = await User.findOne({ userId });
  return result;
};

export const UserServices = {
  userToDatabase,
  getUsersFromDatabase,
  getSingleUserFromDatabase,
};
