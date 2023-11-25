import { User } from './user.model';
import { TOrders, TUser } from './user.interface';
const userToDatabase = async (user: TUser): Promise<TUser> => {
      const result = await User.create(user);
      return result;
};

const getUsersFromDatabase = async (): Promise<TUser[]> => {
      const result = await User.find().select({
            username: 1,
            fullName: 1,
            age: 1,
            email: 1,
            address: 1,
            _id: 0,
      });
      return result;
};

const getSingleUserFromDatabase = async (
      userId: string,
): Promise<TUser | null> => {
      if (!(await User.isUserExists(userId))) {
            throw new Error('User not found');
      }
      const result = await User.findOne({ userId })
            .select({ password: 0, orders: 0 })
            .select('-_id');
      return result;
};

const updateUserToDatabase = async (
      userId: string,
      userData: TUser,
): Promise<TUser | null> => {
      if (!(await User.isUserExists(userId))) {
            throw new Error('User not found');
      }
      const updateData = { $set: userData };
      const result = await User.findOneAndUpdate({ userId }, updateData, {
            new: true,
            runValidators: true,
      })
            .select({ orders: 0 })
            .select('-_id');
      return result;
};

const deleteUserFromDataBase = async (
      userId: string,
): Promise<TUser | null> => {
      if (!(await User.isUserExists(userId))) {
            throw new Error('User not found');
      }
      const result = await User.findOneAndDelete({ userId });
      return result;
};

const createOrderToDatabase = async (
      userId: string,
      userData: TOrders,
): Promise<TUser | null> => {
      if (!(await User.isUserExists(userId))) {
            throw new Error('User not found');
      }
      const updateData = { $push: { orders: userData } };
      const result = await User.findOneAndUpdate({ userId }, updateData, {
            new: true,
            runValidators: true,
      });
      return result;
};

const getOrder = async (userId: string): Promise<TUser | null> => {
      if (!(await User.isUserExists(userId))) {
            throw new Error('User not found');
      }
      const result = await User.findOne({ userId }).select({ orders: 1 });
      return result;
};

const getTotalPriceFromDB = async (userId: string) => {
      if (!(await User.isUserExists(userId))) {
            throw new Error('User not found');
      }
      const result = await User.aggregate([
            { $match: { userId } },
            { $unwind: '$orders' },
            {
                  $group: {
                        _id: null,
                        totalAmount: {
                              $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
                        },
                  },
            },
      ]);
      if (result.length === 0) {
            return 0
      }
      return result;
};

export const UserServices = {
      userToDatabase,
      getUsersFromDatabase,
      getSingleUserFromDatabase,
      updateUserToDatabase,
      deleteUserFromDataBase,
      createOrderToDatabase,
      getOrder,
      getTotalPriceFromDB,
};