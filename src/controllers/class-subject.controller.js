import asyncHandler from "../utils/asyncHandler.js";

import {
  createClassSubject,
  getClassSubjects,
  getClassSubjectById,
  updateClassSubject,
  deleteClassSubject,
} from "../services/class-subject.service.js";

const createClassSubjectController = asyncHandler(async (req, res) => {
  const assignment = await createClassSubject(req.validated.body);

  res.status(201).json({
    success: true,
    data: assignment,
  });
  console.log("Class-subject assignment created successfully:", assignment);
});

const getClassSubjectsController = asyncHandler(async (req, res) => {
  const assignments = await getClassSubjects();

  res.status(200).json({
    success: true,
    data: assignments,
  });
  console.log("Class-subject assignments retrieved successfully:", assignments);
});

const getClassSubjectController = asyncHandler(async (req, res) => {
  const assignment = await getClassSubjectById(req.validated.params.id);

  res.status(200).json({
    success: true,
    data: assignment,
  });
  console.log("Class-subject assignment retrieved successfully:", assignment);
});

const updateClassSubjectController = asyncHandler(async (req, res) => {
  const assignment = await updateClassSubject(
    req.validated.params.id,
    req.validated.body,
  );

  res.status(200).json({
    success: true,
    data: assignment,
  });
  console.log("Class-subject assignment updated successfully:", assignment);
});

const deleteClassSubjectController = asyncHandler(async (req, res) => {
  await deleteClassSubject(req.validated.params.id);
  console.log("Class-subject assignment deleted successfully:");
  res.status(200).json({
    success: true,
    message: "Class-subject assignment deleted successfully",
  });
});

export {
  createClassSubjectController,
  getClassSubjectsController,
  getClassSubjectController,
  updateClassSubjectController,
  deleteClassSubjectController,
};
