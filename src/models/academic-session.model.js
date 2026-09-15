import mongoose from "mongoose";

const academicSessionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        startDate: {
            type: Date,
            required: true
        },

        endDate: {
            type: Date,
            required: true,
            validate: {
                validator: function (value) {
                    return value > this.startDate;
                },
                message: "End date must be after start date"
            }
        },

        isActive: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

// Only one academic session can be active at a time.
academicSessionSchema.index(
    { isActive: 1 },
    {
        unique: true,
        partialFilterExpression: {
            isActive: true
        }
    }
);

const AcademicSession = mongoose.model(
    "AcademicSession",
    academicSessionSchema
);

export default AcademicSession;