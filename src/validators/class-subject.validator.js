import { z } from "zod";

const objectId = (fieldName) =>
    z
        .string()
        .regex(
            /^[0-9a-fA-F]{24}$/,
            `Invalid ${fieldName} ID`
        );

const createClassSubjectSchema = z.object({
    class: objectId("class"),

    subject: objectId("subject"),

    teacher: objectId("teacher").optional(),

    isCompulsory: z
        .boolean()
        .optional(),

    periodsPerWeek: z
        .number()
        .int()
        .min(1, "Periods per week must be at least 1")
        .optional()
});

const updateClassSubjectSchema = z.object({
    teacher: objectId("teacher").optional(),

    isCompulsory: z
        .boolean()
        .optional(),

    periodsPerWeek: z
        .number()
        .int()
        .min(1, "Periods per week must be at least 1")
        .optional()
});

const classSubjectIdSchema = z.object({
    id: objectId("class-subject")
});

export {
    createClassSubjectSchema,
    updateClassSubjectSchema,
    classSubjectIdSchema
};