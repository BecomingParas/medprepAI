import { z } from 'zod';
import { USER_ROLES } from './roles.ts';

export const userRoleSchema = z.enum(USER_ROLES);

export const emailSchema = z.string().trim().email().max(254);

export const passwordSchema = z.string().min(8).max(128);

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1).max(128),
});

export const signUpSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: emailSchema,
  password: passwordSchema,
}).strict();

export const passwordResetSchema = z.object({
  newPassword: passwordSchema,
  token: z.string().min(1),
});

export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
