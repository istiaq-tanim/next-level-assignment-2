import { z } from 'zod';

const fullNameSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

const orderSchema = z.object({
  productName: z.string(),
  price: z.number().refine(
    (value) => value > 0,
    () => ({ message: `Price Should be a Positive Value` }),
  ),
  quantity: z.number().refine(
    (value) => value > 0,
    { message: `Quantity Should be a Positive Value` },
  ),
});


export const userCreateValidationUpdateSchema = z.object({
  userId: z.number(),
  username: z
    .string()
    .max(20, { message: 'UserName must less than 20 Character' }),
  password: z
    .string()
    .min(5, { message: 'Password must greater than 5 Character' }),
  fullName: fullNameSchema,
  age: z.number(),
  email: z.string().email({ message: "Invalid email address" }),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressSchema,
  orders: z.array(orderSchema).optional(),
});

const updateFullNameSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

const updateAddressSchema = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});

const updateOrderSchema = z.object({
  productName: z.string().optional(),
  price: z.number().refine(
    (value) => value > 0,
    { message: `Price Should be a Positive Value` },
  ).optional(),
  quantity: z.number().refine(
    (value) => value > 0,
    { message: `Quantity Should be a Positive Value` },
  ).optional(),
});

const userUpdateValidationUpdateSchema = z.object({
  userId: z.number().optional(),
  username: z
    .string()
    .max(20, { message: 'UserName must less than 20 Character' }).optional(),
  password: z
    .string()
    .min(5, { message: 'Password must greater than 5 Character' }).optional(),
  fullName: updateFullNameSchema.optional(),
  age: z.number().optional(),
  email: z.string().email().optional(),
  isActive: z.boolean().optional(),
  hobbies: z.array(z.string()).optional(),
  address: updateAddressSchema.optional(),
  orders: z.array(updateOrderSchema).optional(),
});
export const validationUser = {
  userUpdateValidationUpdateSchema,
  userCreateValidationUpdateSchema,
  orderSchema
}

