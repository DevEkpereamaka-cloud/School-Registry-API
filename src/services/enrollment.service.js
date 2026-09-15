import mongoose from "mongoose";

import Enrollment from "../models/enrollment.model.js";
import Student from "../models/student.model.js";
import Class from "../models/class.model.js";
import AcademicSession from "../models/academic-session.model.js";
import ApiError from "../utils/Apierror.js";

const validateEnrollmentReferences = async (
    studentId,
    classId,
    academicSessionId
) => {
    const [student, classRecord, academicSession] =
        await Promise.all([
            Student.findById(studentId),
            Class.findById(classId),
            AcademicSession.findById(academicSessionId)
        ]);

    if (!student) {
        throw new ApiError(
            404,
            "Student not found"
        );
    }

    if (!classRecord) {
        throw new ApiError(
            404,
            "Class not found"
        );
    }

    if (!academicSession) {
        throw new ApiError(
            404,
            "Academic session not found"
        );
    }

    if (
        classRecord.academicSession.toString() !==
        academicSessionId
    ) {
        throw new ApiError(
            400,
            "Class does not belong to the selected academic session"
        );
    }

    return {
        student,
        classRecord,
        academicSession
    };
};

const createEnrollment = async (data) => {
    await validateEnrollmentReferences(
        data.student,
        data.class,
        data.academicSession
    );

    const existingEnrollment =
        await Enrollment.findOne({
            student: data.student,
            academicSession: data.academicSession
        });

    if (existingEnrollment) {
        throw new ApiError(
            409,
            "Student is already enrolled for this academic session"
        );
    }

    return Enrollment.create(data);
};

const getEnrollments = async () => {
    return Enrollment.find()
        .populate(
            "student",
            "firstName lastName admissionNumber"
        )
        .populate(
            "class",
            "name level"
        )
        .populate(
            "academicSession",
            "name startDate endDate"
        )
        .sort({
            createdAt: -1
        });
};

const getEnrollmentById = async (id) => {
    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(
            400,
            "Invalid enrollment ID"
        );
    }

    const enrollment =
        await Enrollment.findById(id)
            .populate(
                "student",
                "firstName lastName admissionNumber"
            )
            .populate(
                "class",
                "name level"
            )
            .populate(
                "academicSession",
                "name startDate endDate"
            );

    if (!enrollment) {
        throw new ApiError(
            404,
            "Enrollment not found"
        );
    }

    return enrollment;
};

const updateEnrollment = async (id, data) => {
    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(
            400,
            "Invalid enrollment ID"
        );
    }

    const enrollment =
        await Enrollment.findById(id);

    if (!enrollment) {
        throw new ApiError(
            404,
            "Enrollment not found"
        );
    }

    if (data.class) {
        const classRecord =
            await Class.findById(data.class);

        if (!classRecord) {
            throw new ApiError(
                404,
                "Class not found"
            );
        }

        if (
            classRecord.academicSession.toString() !==
            enrollment.academicSession.toString()
        ) {
            throw new ApiError(
                400,
                "Class does not belong to the enrollment's academic session"
            );
        }
    }

    Object.assign(enrollment, data);

    return enrollment.save();
};

export {
    createEnrollment,
    getEnrollments,
    getEnrollmentById,
    updateEnrollment
};