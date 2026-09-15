import { z } from "zod";

const createClassSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Class name is required"),

    level: z
        .string()
        .trim()
        .min(1, "Class level is required"),

    academicSession: z
        .string()
        .regex(
            /^[0-9a-fA-F]{24}$/,
            "Invalid academic session ID"
        ),

    classTeacher: z
        .string()
        .regex(
            /^[0-9a-fA-F]{24}$/,
            "Invalid teacher ID"
        )
        .optional()
});

const updateClassSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Class name cannot be empty")
        .optional(),

    level: z
        .string()
        .trim()
        .min(1, "Class level cannot be empty")
        .optional(),

    academicSession: z
        .string()
        .regex(
            /^[0-9a-fA-F]{24}$/,
            "Invalid academic session ID"
        )
        .optional(),

    classTeacher: z
        .string()
        .regex(
            /^[0-9a-fA-F]{24}$/,
            "Invalid teacher ID"
        )
        .optional()
});

const classIdSchema = z.object({
    id: z
        .string()
        .regex(
            /^[0-9a-fA-F]{24}$/,
            "Invalid class ID"
        )
});

export {
    createClassSchema,
    updateClassSchema,
    classIdSchema
};