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
  price: z.number().refine(value => value > 0, (value) => ({ message: `${value} Should be Positive` })),
  quantity: z.number().refine(value => value > 0, (value) => ({ message: `${value} Should be Positive` })),
});

const userValidationSchema = z.object({
  userId: z.string(),
  username: z
    .string()
    .max(20, { message: 'UserName must less than 20 Character' }),
  password: z
    .string()
    .min(8, { message: 'Password must less than 8 Character' }),
  fullName: fullNameSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressSchema,
  orders: z.array(orderSchema).optional(),
});

export default userValidationSchema;
