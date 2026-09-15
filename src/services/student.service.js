import mongoose from "mongoose";

import Student from "../models/student.model.js";
import ApiError from "../utils/Apierror.js";

const createStudent = async (data) => {
    const existingStudent =
        await Student.findOne({
            admissionNumber: data.admissionNumber
        });

    if (existingStudent) {
        throw new ApiError(
            409,
            "Admission number already exists"
        );
    }

    return Student.create(data);
};

const getStudents = async () => {
    return Student.find().sort({
        lastName: 1,
        firstName: 1
    });
};

const getStudentById = async (id) => {
    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(
            400,
            "Invalid student ID"
        );
    }

    const student = await Student.findById(id);

    if (!student) {
        throw new ApiError(
            404,
            "Student not found"
        );
    }

    return student;
};

const updateStudent = async (id, data) => {
    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(
            400,
            "Invalid student ID"
        );
    }

    const student = await Student.findById(id);

    if (!student) {
        throw new ApiError(
            404,
            "Student not found"
        );
    }

    if (data.admissionNumber) {
        const existingStudent =
            await Student.findOne({
                admissionNumber: data.admissionNumber,
                _id: { $ne: id }
            });

        if (existingStudent) {
            throw new ApiError(
                409,
                "Admission number already exists"
            );
        }
    }

    Object.assign(student, data);

    return student.save();
};

const deleteStudent = async (id) => {
    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(
            400,
            "Invalid student ID"
        );
    }

    const student = await Student.findById(id);

    if (!student) {
        throw new ApiError(
            404,
            "Student not found"
        );
    }

    await student.deleteOne();
};

export {
    createStudent,
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent
};