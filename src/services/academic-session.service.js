import mongoose from "mongoose";

import AcademicSession from "../models/academic-session.model.js";
import ApiError from "../utils/Apierror.js";

const createAcademicSession = async (data) => {
    if (data.isActive === true) {
        await AcademicSession.updateMany(
            { isActive: true },
            { $set: { isActive: false } }
        );
    }
    
    return AcademicSession.create(data);
};

const getAcademicSessions = async () => {
    return AcademicSession.find().sort({
        startDate: -1
    });
};

const getAcademicSessionById = async (id) => {
    if (!mongoose.isValidObjectId(id)) {
        console.log("Invalid academic session ID:", id);
        throw new ApiError(
            400,
            "Invalid academic session ID"
        );
    }

    const session = await AcademicSession.findById(id);

    if (!session) {
        console.log("Academic session not found for ID:", id);
        throw new ApiError(
            404,
            "Academic session not found"
        );
    }

    return session;
};

const updateAcademicSession = async (id, data) => {
    if (!mongoose.isValidObjectId(id)) {
        console.log("Invalid academic session ID for update:", id);
        throw new ApiError(
            400,
            "Invalid academic session ID"
        );
    }

    const session = await AcademicSession.findById(id);

    if (!session) {
        console.log("Academic session not found for update:", id);
        throw new ApiError(
            404,
            "Academic session not found"
        );
    }

    if (data.isActive === true) {
        await AcademicSession.updateMany(
            {
                isActive: true,
                _id: { $ne: id }
            },
            {
                $set: { isActive: false }
            }
        );
    }

    Object.assign(session, data);

    return session.save();
};

const deleteAcademicSession = async (id) => {
    if (!mongoose.isValidObjectId(id)) {
        console.log("Invalid academic session ID for deletion:", id);
        throw new ApiError(
            400,
            "Invalid academic session ID"
        );
    }

    const session = await AcademicSession.findById(id);

    if (!session) {
        console.log("Academic session not found for deletion:", id);
        throw new ApiError(
            404,
            "Academic session not found"
        );
    }

    if (session.isActive) {
        console.log("Attempted to delete active academic session:", id);
        throw new ApiError(
            409,
            "The active academic session cannot be deleted"
        );
    }

    await session.deleteOne();
};

export {
    createAcademicSession,
    getAcademicSessions,
    getAcademicSessionById,
    updateAcademicSession,
    deleteAcademicSession
};