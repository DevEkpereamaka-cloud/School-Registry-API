import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            required: true
        },

        class: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Class",
            required: true
        },

        academicSession: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AcademicSession",
            required: true
        },

        status: {
            type: String,
            enum: ["active", "completed", "withdrawn"],
            default: "active"
        }
    },
    {
        timestamps: true
    }
);

enrollmentSchema.index(
    {
        student: 1,
        academicSession: 1
    },
    {
        unique: true
    }
);

const Enrollment = mongoose.model(
    "Enrollment",
    enrollmentSchema
);

export default Enrollment;