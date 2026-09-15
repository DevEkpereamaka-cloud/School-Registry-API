import mongoose from "mongoose";

import ClassSubject from "../models/class-subject.model.js";
import Class from "../models/class.model.js";
import Subject from "../models/subject.model.js";
import Teacher from "../models/teacher.model.js";
import ApiError from "../utils/Apierror.js";

const ensureClassExists = async (classId) => {
    const classRecord = await Class.findById(classId);

    if (!classRecord) {
        console.error("Class not found");
        throw new ApiError(
            404,
            "Class not found"
        );
    }

    return classRecord;
};

const ensureSubjectExists = async (subjectId) => {
    const subject = await Subject.findById(subjectId);

    if (!subject) {
        throw new ApiError(
            404,
            "Subject not found"
        );
    }

    return subject;
};

const ensureTeacherExists = async (teacherId) => {
    if (!teacherId) {
        return null;
    }

    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
        throw new ApiError(
            404,
            "Teacher not found"
        );
    }

    return teacher;
};

const createClassSubject = async (data) => {
    await ensureClassExists(data.class);

    await ensureSubjectExists(data.subject);

    await ensureTeacherExists(data.teacher);

    const existingAssignment =
        await ClassSubject.findOne({
            class: data.class,
            subject: data.subject
        });

    if (existingAssignment) {
        throw new ApiError(
            409,
            "This subject is already assigned to this class"
        );
    }

    const classSubject = await ClassSubject.create(data);

    return ClassSubject.findById(classSubject._id)
        .populate("class")
        .populate("subject")
        .populate("teacher");
};

const getClassSubjects = async () => {
    return ClassSubject.find()
        .populate("class")
        .populate("subject")
        .populate("teacher")
        .sort({
            createdAt: -1
        });
};

const getClassSubjectById = async (id) => {
    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(
            400,
            "Invalid class-subject ID"
        );
    }

    const classSubject =
        await ClassSubject.findById(id)
            .populate("class")
            .populate("subject")
            .populate("teacher");

    if (!classSubject) {
        throw new ApiError(
            404,
            "Class-subject assignment not found"
        );
    }

    return classSubject;
};

const updateClassSubject = async (id, data) => {
    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(
            400,
            "Invalid class-subject ID"
        );
    }

    const classSubject =
        await ClassSubject.findById(id);

    if (!classSubject) {
        throw new ApiError(
            404,
            "Class-subject assignment not found"
        );
    }

    if (data.teacher) {
        await ensureTeacherExists(data.teacher);
    }

    Object.assign(classSubject, data);

    const updatedClassSubject =
        await classSubject.save();

    return ClassSubject.findById(
        updatedClassSubject._id
    )
        .populate("class")
        .populate("subject")
        .populate("teacher");
};

const deleteClassSubject = async (id) => {
    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(
            400,
            "Invalid class-subject ID"
        );
    }

    const classSubject =
        await ClassSubject.findById(id);

    if (!classSubject) {
        throw new ApiError(
            404,
            "Class-subject assignment not found"
        );
    }

    await classSubject.deleteOne();
};

export {
    createClassSubject,
    getClassSubjects,
    getClassSubjectById,
    updateClassSubject,
    deleteClassSubject
};