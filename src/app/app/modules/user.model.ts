import { Schema, model } from 'mongoose';
import { TAddress, TFullName, TOrders, TUser } from './users/user.interface';

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

const userSchema = new Schema<TUser>({
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

export const User = model<TUser>('User', userSchema);
