import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  role: z.enum(["USER", "ADMIN"]),
});

export type User = z.infer<typeof userSchema>;

export const authResponseSchema = z.object({
  accessToken: z.string(),
  user: userSchema,
});

export type AuthResponse = z.infer<typeof authResponseSchema>;

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type Register = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type Login = z.infer<typeof loginSchema>; 