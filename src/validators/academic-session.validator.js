import { z } from "zod";

const sessionNameSchema = z
    .string()
    .trim()
    .regex(
        /^\d{4}\/\d{4}$/,
        "Session name must use the format YYYY/YYYY"
    )
    .refine(
        (value) => {
            const [startYear, endYear] = value
                .split("/")
                .map(Number);

            return endYear === startYear + 1;
        },
        {
            message: "Academic session years must be consecutive"
        }
    );

const createAcademicSessionSchema = z
    .object({
        name: sessionNameSchema,

        startDate: z.coerce.date(),

        endDate: z.coerce.date(),

        isActive: z.boolean().optional()
    })
    .refine(
        (data) => data.endDate > data.startDate,
        {
            message: "End date must be after start date",
            path: ["endDate"]
        }
    );

const updateAcademicSessionSchema = z
    .object({
        name: sessionNameSchema.optional(),

        startDate: z.coerce.date().optional(),

        endDate: z.coerce.date().optional(),

        isActive: z.boolean().optional()
    })
    .refine(
        (data) => {
            if (data.startDate && data.endDate) {
                return data.endDate > data.startDate;
            }

            return true;
        },
        {
            message: "End date must be after start date",
            path: ["endDate"]
        }
    );

const academicSessionIdSchema = z.object({
    id: z
        .string()
        .regex(
            /^[0-9a-fA-F]{24}$/,
            "Invalid academic session ID"
        )
});

export {
    createAcademicSessionSchema,
    updateAcademicSessionSchema,
    academicSessionIdSchema
};