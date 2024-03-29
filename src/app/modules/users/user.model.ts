/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import {
  TAddress,
  TFullName,
  TOrders,
  TUser,
  UserModel,
} from './user.interface';


const fullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
});

const addressSchema = new Schema<TAddress>({
  street: { type: String, trim: true, },
  city: { type: String, trim: true, },
  country: { type: String, trim: true, },
});

const orderSchema = new Schema<TOrders>({
  productName: { type: String },
  price: { type: Number },
  quantity: { type: Number },
});

const userSchema = new Schema<TUser, UserModel>({
  userId: { type: Number, unique: true, required: true },
  username: { type: String, unique: true },
  password: { type: String },
  fullName: { type: fullNameSchema, _id: false },
  age: { type: Number },
  email: { type: String },
  isActive: { type: Boolean },
  hobbies: { type: [String] },
  address: { type: addressSchema, _id: false },
  orders: { type: [orderSchema] },
});

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

userSchema.statics.isUserExists = async function (userId: string) {
  const existingUser = await User.findOne({ userId: Number(userId) });
  return existingUser;
};
export const User = model<TUser, UserModel>('User', userSchema);
