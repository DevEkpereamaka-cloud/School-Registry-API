import { z } from "zod";

const createSubjectSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Subject name is required"),

    code: z
        .string()
        .trim()
        .min(1, "Subject code is required")
        .max(20, "Subject code cannot exceed 20 characters"),

    description: z
        .string()
        .trim()
        .optional()
});

const updateSubjectSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Subject name cannot be empty")
        .optional(),

    code: z
        .string()
        .trim()
        .min(1, "Subject code cannot be empty")
        .max(20, "Subject code cannot exceed 20 characters")
        .optional(),

    description: z
        .string()
        .trim()
        .optional()
});

const subjectIdSchema = z.object({
    id: z
        .string()
        .regex(
            /^[0-9a-fA-F]{24}$/,
            "Invalid subject ID"
        )
});

export {
    createSubjectSchema,
    updateSubjectSchema,
    subjectIdSchema
};