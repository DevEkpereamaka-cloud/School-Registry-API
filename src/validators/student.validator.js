import { z } from "zod";

const guardianSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Guardian name is required"),

    phoneNumber: z
        .string()
        .regex(
            /^0\d{10}$/,
            "Guardian phone number must be exactly 11 digits"
        )
});

const createStudentSchema = z.object({
    firstName: z
        .string()
        .trim()
        .min(1, "First name is required"),

    lastName: z
        .string()
        .trim()
        .min(1, "Last name is required"),

    admissionNumber: z
        .string()
        .trim()
        .min(1, "Admission number is required"),

    dateOfBirth: z.coerce.date(),

    gender: z.enum(
        ["male", "female"],
        {
            message: "Gender must be male or female"
        }
    ),

    guardian: guardianSchema
});

const updateStudentSchema = z.object({
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

    admissionNumber: z
        .string()
        .trim()
        .min(1, "Admission number cannot be empty")
        .optional(),

    dateOfBirth: z
        .coerce
        .date()
        .optional(),

    gender: z
        .enum(["male", "female"])
        .optional(),

    guardian: guardianSchema.optional()
});

const studentIdSchema = z.object({
    id: z
        .string()
        .regex(
            /^[0-9a-fA-F]{24}$/,
            "Invalid student ID"
        )
});

export {
    createStudentSchema,
    updateStudentSchema,
    studentIdSchema
};