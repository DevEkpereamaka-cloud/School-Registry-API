import asyncHandler from "../utils/asyncHandler.js";

import {
  createSubject,
  getSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
} from "../services/subject.service.js";

const createSubjectController = asyncHandler(async (req, res) => {
  const subject = await createSubject(req.validated.body);

  res.status(201).json({
    success: true,
    data: subject,
  });
  console.log("Subject created successfully:", subject);
});

const getSubjectsController = asyncHandler(async (req, res) => {
  const subjects = await getSubjects();

  res.status(200).json({
    success: true,
    data: subjects,
  });
  console.log("Subjects retrieved successfully:", subjects);
});

const getSubjectController = asyncHandler(async (req, res) => {
  const subject = await getSubjectById(req.validated.params.id);

  res.status(200).json({
    success: true,
    data: subject,
  });
  console.log("Subject retrieved successfully:", subject);
});

const updateSubjectController = asyncHandler(async (req, res) => {
  const subject = await updateSubject(
    req.validated.params.id,
    req.validated.body,
  );
  console.log("Subject updated successfully:", subject);

  res.status(200).json({
    success: true,
    data: subject,
  });
});

const deleteSubjectController = asyncHandler(async (req, res) => {
  await deleteSubject(req.validated.params.id);
  console.log("Subject deleted successfully:", req.validated.params.id);
  res.status(201).send({
    success: true,
    message: "Subject deleted successfully",
  });
});

export {
  createSubjectController,
  getSubjectsController,
  getSubjectController,
  updateSubjectController,
  deleteSubjectController,
};
