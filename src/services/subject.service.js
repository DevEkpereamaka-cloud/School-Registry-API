import mongoose from "mongoose";

import Subject from "../models/subject.model.js";
import ApiError from "../utils/Apierror.js";

const createSubject = async (data) => {
    const existingName = await Subject.findOne({
        name: data.name
    });

    if (existingName) {
        console.log("Existing subject name found:", existingName.name);
        throw new ApiError(
            409,
            "Subject name already exists"
        );
    }

    const existingCode = await Subject.findOne({
        code: data.code.toUpperCase()
    });

    if (existingCode) {
        console.log("Existing subject code found:", existingCode.code);
        throw new ApiError(
            409,
            "Subject code already exists"
        );
    }

    return Subject.create(data);
};

const getSubjects = async () => {
    console.log("Retrieving all subjects");
    return Subject.find().sort({
        name: 1
    });
};

const getSubjectById = async (id) => {
    console.log("Retrieving subject by ID:", id);
    if (!mongoose.isValidObjectId(id)) {
        console.log("Invalid subject ID:", id);
        throw new ApiError(
            400,
            "Invalid subject ID"
        );
    }

    const subject = await Subject.findById(id);

    if (!subject) {
        console.log("Subject not found for ID:", id);
        throw new ApiError(
            404,
            "Subject not found"
        );
    }

    return subject;
};

const updateSubject = async (id, data) => {
    if (!mongoose.isValidObjectId(id)) {
        console.log("Invalid subject ID for update", id)
        throw new ApiError(
            400,
            "Invalid subject ID"
        );
    }

    const subject = await Subject.findById(id);

    if (!subject) {
        console.log("Subject not found for update", id)
        throw new ApiError(
            404,
            "Subject not found"
        );
    }

    if (data.name) {
        const existingName = await Subject.findOne({
            name: data.name,
            _id: { $ne: id }
        });

        if (existingName) {
            console.log("Subject Name already exists", data.name)
            throw new ApiError(
                409,
                "Subject name already exists"
            );
        }
    }

    if (data.code) {
        const existingCode = await Subject.findOne({
            code: data.code.toUpperCase(),
            _id: { $ne: id }
        });

        if (existingCode) {
            console.log("Subject Code already exists", data.code.toUpperCase())
            throw new ApiError(
                409,
                "Subject code already exists"
            );
        }
    }

    Object.assign(subject, data);

    return subject.save();
};

const deleteSubject = async (id) => {
    if (!mongoose.isValidObjectId(id)) {
     console.log("Invalid subject ID for deletion", id)
        throw new ApiError(
            400,
            "Invalid subject ID"
        );
    }

    const subject = await Subject.findById(id);

    if (!subject) {
        console.log("Subject not found for deletion", id)
        throw new ApiError(
            404,
            "Subject not found"
        );
    }

    await subject.deleteOne();
};

export {
    createSubject,
    getSubjects,
    getSubjectById,
    updateSubject,
    deleteSubject
};