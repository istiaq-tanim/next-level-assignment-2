import { User } from './../user.model';
import { TUser } from './user.interface';
const userToDatabase = async (user: TUser): Promise<TUser> => {
      const result = await User.create(user);
      return result;
};

const getUsersFromDatabase = async (): Promise<TUser[]> => {
      const result = await User.find();
      return result;
};

const getSingleUserFromDatabase = async (userId: string): Promise<TUser | null> => {
      const result = await User.findOne({ userId });
      return result;
};

const updateUserToDatabase = async (userId: string, userData: TUser): Promise<TUser | null> => {
      const updateData = { $set: userData };
      const result = await User.findOneAndUpdate({ userId }, updateData, {
            new: true,
            runValidators: true,
      })
      return result
}

const deleteUserFromDataBase = async (userId: string): Promise<TUser | null> => {
      const result = await User.findOneAndDelete({ userId })
      return result
}

export const UserServices = {
      userToDatabase,
      getUsersFromDatabase,
      getSingleUserFromDatabase,
      updateUserToDatabase,
      deleteUserFromDataBase
};
