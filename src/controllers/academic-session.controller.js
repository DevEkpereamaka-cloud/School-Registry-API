import asyncHandler from "../utils/asyncHandler.js";

import {
  createAcademicSession,
  getAcademicSessions,
  getAcademicSessionById,
  updateAcademicSession,
  deleteAcademicSession,
} from "../services/academic-session.service.js";

const createSession = asyncHandler(async (req, res) => {
  const session = await createAcademicSession(req.validated.body);

  res.status(201).json({
    success: true,
    data: session,
  });
  console.log("Academic session created successfully:", session);
});

const getSessions = asyncHandler(async (req, res) => {
  const sessions = await getAcademicSessions();

  res.status(200).json({
    success: true,
    data: sessions,
  });
  console.log("Academic sessions retrieved successfully:", sessions);
});

const getSession = asyncHandler(async (req, res) => {
  const session = await getAcademicSessionById(req.validated.params.id);

  res.status(200).json({
    success: true,
    data: session,
  });
  console.log("Academic session retrieved successfully:", session);
});

const updateSession = asyncHandler(async (req, res) => {
  const session = await updateAcademicSession(
    req.validated.params.id,
    req.validated.body,
  );

  res.status(200).json({
    success: true,
    data: session,
  });
  console.log("Academic session updated successfully:", session);
});

const deleteSession = asyncHandler(async (req, res) => {
  await deleteAcademicSession(req.validated.params.id);

  res.status(200).send({
    success: true,
    message: "Academic session deleted successfully",
  });
  console.log(
    "Academic session deleted successfully:",
    req.validated.params.id,
  );
});

export { createSession, getSessions, getSession, updateSession, deleteSession };
