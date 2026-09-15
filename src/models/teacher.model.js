import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },

        lastName: {
            type: String,
            required: true,
            trim: true
        },

        employeeId: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        phoneNumber: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;