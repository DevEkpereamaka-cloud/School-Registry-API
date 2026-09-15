import { z } from "zod";

const objectIdSchema = (fieldName) =>
    z
        .string()
        .regex(
            /^[0-9a-fA-F]{24}$/,
            `Invalid ${fieldName} ID`
        );

const createEnrollmentSchema = z.object({
    student: objectIdSchema("student"),

    class: objectIdSchema("class"),

    academicSession: objectIdSchema(
        "academic session"
    ),

    status: z
        .enum([
            "active",
            "completed",
            "withdrawn"
        ])
        .optional()
});

const updateEnrollmentSchema = z.object({
    class: objectIdSchema("class").optional(),

    status: z
        .enum([
            "active",
            "completed",
            "withdrawn"
        ])
        .optional()
});

const enrollmentIdSchema = z.object({
    id: objectIdSchema("enrollment")
});

export {
    createEnrollmentSchema,
    updateEnrollmentSchema,
    enrollmentIdSchema
};