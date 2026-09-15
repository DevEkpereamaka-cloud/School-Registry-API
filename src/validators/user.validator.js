import { z } from "zod";

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID");

const createTeacherSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),

  lastName: z.string().trim().min(1, "Last name is required"),

  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .transform((value) => value.toLowerCase()),

  password: z.string().min(8, "Password must be at least 8 characters"),
});

const userIdSchema = z.object({
  id: objectIdSchema,
});

const updateUserStatusSchema = z.object({
  isActive: z.boolean(),
});

export { createTeacherSchema, userIdSchema, updateUserStatusSchema };
