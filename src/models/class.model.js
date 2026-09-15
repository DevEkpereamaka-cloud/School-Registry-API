import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        level: {
            type: String,
            required: true,
            trim: true
        },

        academicSession: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AcademicSession",
            required: true
        },

        classTeacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Teacher"
        }
    },
    {
        timestamps: true
    }
);

classSchema.index(
    {
        name: 1,
        academicSession: 1
    },
    {
        unique: true
    }
);

const Class = mongoose.model("Class", classSchema);

export default Class;