import mongoose from "mongoose";

import Class from "../models/class.model.js";
import AcademicSession from "../models/academic-session.model.js";
import Teacher from "../models/teacher.model.js";
import ApiError from "../utils/Apierror.js";

const ensureAcademicSessionExists = async (academicSession) => {
    const session = await AcademicSession.findById(
        academicSession
    );

    if (!session) {
        console.log("Academic session not found for ID:", academicSession);
        throw new ApiError(
            404,
            "Academic session not found"
        );
    }

    return session;
};

const ensureTeacherExists = async (classTeacher) => {
    if (!classTeacher) {
        console.log("No class teacher provided, skipping teacher existence check.");
        return null;
    }

    const teacher = await Teacher.findById(classTeacher);

    if (!teacher) {
        console.log("Teacher not found for ID:", classTeacher);
        throw new ApiError(
            404,
            "Teacher not found"
        );
    }

    return teacher;
};

const createClass = async (data) => {
    await ensureAcademicSessionExists(
        data.academicSession
    );

    await ensureTeacherExists(data.classTeacher);

    const existingClass = await Class.findOne({
        name: data.name,
        academicSession: data.academicSession
    });

    if (existingClass) {
        console.log("Duplicate class found with name:", data.name, "in academic session:", data.academicSession);
        throw new ApiError(
            409,
            "A class with this name already exists in this academic session"
        );
    }

    const newClass = await Class.create(data);

    return Class.findById(newClass._id)
        .populate("academicSession")
        .populate("classTeacher");
};

const getClasses = async () => {
    return Class.find()
        .populate("academicSession")
        .populate("classTeacher")
        .sort({
            createdAt: -1
        });
};

const getClassById = async (id) => {
    if (!mongoose.isValidObjectId(id)) {
        console.log("Invalid class ID:", id);
        throw new ApiError(
            400,
            "Invalid class ID"
        );
    }

    const classRecord = await Class.findById(id)
        .populate("academicSession")
        .populate("classTeacher");

    if (!classRecord) {
        console.log("Class not found for ID:", id);
        throw new ApiError(
            404,
            "Class not found"
        );
    }

    return classRecord;
};

const updateClass = async (id, data) => {
    if (!mongoose.isValidObjectId(id)) {
        console.log("Invalid class ID for update:", id);
        throw new ApiError(
            400,
            "Invalid class ID"
        );
    }

    const classRecord = await Class.findById(id);

    if (!classRecord) {
        console.log("Class not found for update:", id);
        throw new ApiError(
            404,
            "Class not found"
        );
    }

    if (data.academicSession) {
        await ensureAcademicSessionExists(
            data.academicSession
        );
    }

    if (data.classTeacher) {
        await ensureTeacherExists(
            data.classTeacher
        );
    }

    const academicSession =
        data.academicSession ||
        classRecord.academicSession;

    const name =
        data.name ||
        classRecord.name;

    const duplicateClass = await Class.findOne({
        name,
        academicSession,
        _id: { $ne: id }
    });

    if (duplicateClass) {
        console.log("Duplicate class found with name:", name, "in academic session:", academicSession);
        throw new ApiError(
            409,
            "A class with this name already exists in this academic session"
        );
    }

    Object.assign(classRecord, data);

    const updatedClass = await classRecord.save();

    return Class.findById(updatedClass._id)
        .populate("academicSession")
        .populate("classTeacher");
};

const deleteClass = async (id) => {
    if (!mongoose.isValidObjectId(id)) {
        console.log("Invalid class ID for deletion:", id);
        throw new ApiError(
            400,
            "Invalid class ID"
        );
    }

    const classRecord = await Class.findById(id);

    if (!classRecord) {
        console.log("Class not found for deletion:", id);
        throw new ApiError(
            404,
            "Class not found"
        );
    }

    await classRecord.deleteOne();
};

export {
    createClass,
    getClasses,
    getClassById,
    updateClass,
    deleteClass
};