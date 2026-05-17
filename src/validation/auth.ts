import { z } from "zod";

export const emailSchema = z.string().trim().email().max(120);

export const signUpSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: emailSchema,
  password: z.string().min(8).max(120)
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(8).max(120)
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
