import { z } from "zod";

const registerSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),

  lastName: z.string().trim().min(1, "Last name is required"),

  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .transform((value) => value.toLowerCase()),

  password: z.string().min(8, "Password must be at least 8 characters"),
});

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .transform((value) => value.toLowerCase()),

  password: z.string().min(1, "Password is required"),
});

export { registerSchema, loginSchema };
