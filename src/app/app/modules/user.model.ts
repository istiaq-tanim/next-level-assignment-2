import { Schema, model } from 'mongoose';
import { TAddress, TFullName, TOrders, TUser } from './users/user.interface';

const fullNameSchema = new Schema<TFullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
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

const userSchema = new Schema<TUser>({
  userId: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullName: fullNameSchema,
  age: { type: Number },
  email: { type: String, required: true },
  isActive: { type: Boolean },
  hobbies: { type: [String] },
  address: addressSchema,
  orders: [orderSchema],
});

export const User = model<TUser>('User', userSchema);
