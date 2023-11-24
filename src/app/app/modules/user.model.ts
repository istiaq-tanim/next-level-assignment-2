/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { TAddress, TFullName, TOrders, TUser, UserModel } from './users/user.interface';
import bcrypt from 'bcrypt';
import config from '../config';


const fullNameSchema = new Schema<TFullName>({
  firstName: { type: String, required: [true, 'First Name is required'], trim: true },
  lastName: { type: String, required: [true, 'Last Name is required'], trim: true },
});

const addressSchema = new Schema<TAddress>({
  street: { type: String },
  city: { type: String },
  country: { type: String },
});

const orderSchema = new Schema<TOrders>({
  productName: { type: String },
  price: { type: Number },
  quantity: { type: Number },
});

const userSchema = new Schema<TUser, UserModel>({
  userId: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: fullNameSchema, required: true },
  age: { type: Number },
  email: { type: String, required: true, unique: true },
  isActive: { type: Boolean },
  hobbies: { type: [String] },
  address: { type: addressSchema, required: true },
  orders: [orderSchema],
});

userSchema.pre("save", async function (next) {
  const user = this
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt),)
  next()
})

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
}

userSchema.statics.isUserExists = async function (userId: string) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};
export const User = model<TUser, UserModel>('User', userSchema);
