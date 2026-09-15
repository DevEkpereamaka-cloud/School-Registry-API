import mongoose from "mongoose";

const guardianSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        phoneNumber: {
            type: String,
            required: true,
            match: [
                /^0\d{10}$/,
                "Guardian phone number must be exactly 11 digits"
            ]
        }
    },
    {
        _id: false
    }
);

const studentSchema = new mongoose.Schema(
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

        admissionNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        dateOfBirth: {
            type: Date,
            required: true
        },

        gender: {
            type: String,
            required: true,
            enum: ["male", "female"]
        },

        guardian: {
            type: guardianSchema,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Student = mongoose.model(
    "Student",
    studentSchema
);

export default Student;