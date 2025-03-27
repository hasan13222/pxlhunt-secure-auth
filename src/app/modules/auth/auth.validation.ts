import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    username: z.string(),
    password: z.string(),
    role: z.enum(["admin", "user"]).optional()
  }),
});


const loginUserValidationSchema = z.object({
  body: z.object({
    username: z.string(),
    password: z.string(),
  }),
});


export const AuthValidations = {
  createUserValidationSchema,
  loginUserValidationSchema,
};
