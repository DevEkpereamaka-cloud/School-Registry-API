import mongoose from "mongoose";

import Teacher from "../models/teacher.model.js";
import ApiError from "../utils/Apierror.js";

const createTeacher = async (data) => {
    const existingEmployee = await Teacher.findOne({
        employeeId: data.employeeId
    });

    if (existingEmployee) {
        console.log("Existing employee ID found:", existingEmployee.employeeId);
        throw new ApiError(
            409,
            "Employee ID already exists"
        );
    }

    const existingEmail = await Teacher.findOne({
        email: data.email
    });

    if (existingEmail) {
        console.log("Existing email found:", existingEmail.email);
        throw new ApiError(
            409,
            "Email address already exists"
        );
    }

    return Teacher.create(data);
};

const getTeachers = async () => {
    return Teacher.find().sort({
        lastName: 1,
        firstName: 1
    });
};

const getTeacherById = async (id) => {
    if (!mongoose.isValidObjectId(id)) {
        console.log("Invalid teacher ID:", id);
        throw new ApiError(
            400,
            "Invalid teacher ID"
        );
    }

    const teacher = await Teacher.findById(id);

    if (!teacher) {
        console.log("Teacher not found for ID:", id);
        throw new ApiError(
            404,
            "Teacher not found"
        );
    }

    return teacher;
};

const updateTeacher = async (id, data) => {
    if (!mongoose.isValidObjectId(id)) {
        console.log("Invalid teacher ID for update:", id);
        throw new ApiError(
            400,
            "Invalid teacher ID"
        );
    }

    const teacher = await Teacher.findById(id);

    if (!teacher) {
        console.log("Teacher not found for update:", id);
        throw new ApiError(
            404,
            "Teacher not found"
        );
    }

    if (data.employeeId) {
        const existingEmployee = await Teacher.findOne({
            employeeId: data.employeeId,
            _id: { $ne: id }
        });

        if (existingEmployee) {
            console.log("Duplicate employee ID found for update:", data.employeeId);
            throw new ApiError(
                409,
                "Employee ID already exists"
            );
        }
    }

    if (data.email) {
        const existingEmail = await Teacher.findOne({
            email: data.email,
            _id: { $ne: id }
        });

        if (existingEmail) {
            console.log("Duplicate email found for update:", data.email);
            throw new ApiError(
                409,
                "Email address already exists"
            );
        }
    }

    Object.assign(teacher, data);

    return teacher.save();
};

const deleteTeacher = async (id) => {
    if (!mongoose.isValidObjectId(id)) {
        console.log("Invalid teacher ID for deletion:", id);
        throw new ApiError(
            400,
            "Invalid teacher ID"
        );
    }

    const teacher = await Teacher.findById(id);

    if (!teacher) {
        console.log("Teacher not found for deletion:", id);
        throw new ApiError(
            404,
            "Teacher not found"
        );
    }

    await teacher.deleteOne();
};

export {
    createTeacher,
    getTeachers,
    getTeacherById,
    updateTeacher,
    deleteTeacher
};