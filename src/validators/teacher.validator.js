import { z } from "zod";

const createTeacherSchema = z.object({
    firstName: z
        .string()
        .trim()
        .min(1, "First name is required"),

    lastName: z
        .string()
        .trim()
        .min(1, "Last name is required"),

    employeeId: z
        .string()
        .trim()
        .min(1, "Employee ID is required"),

    email: z
        .string()
        .trim()
        .email("Invalid email address"),

    phoneNumber: z
        .string()
        .trim()
        .optional()
});

const updateTeacherSchema = z.object({
    firstName: z
        .string()
        .trim()
        .min(1, "First name cannot be empty")
        .optional(),

    lastName: z
        .string()
        .trim()
        .min(1, "Last name cannot be empty")
        .optional(),

    employeeId: z
        .string()
        .trim()
        .min(1, "Employee ID cannot be empty")
        .optional(),

    email: z
        .string()
        .trim()
        .email("Invalid email address")
        .optional(),

    phoneNumber: z
        .string()
        .trim()
        .optional()
});

const teacherIdSchema = z.object({
    id: z
        .string()
        .regex(
            /^[0-9a-fA-F]{24}$/,
            "Invalid teacher ID"
        )
});

export {
    createTeacherSchema,
    updateTeacherSchema,
    teacherIdSchema
};