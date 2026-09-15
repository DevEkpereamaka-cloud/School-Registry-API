import asyncHandler from "../utils/asyncHandler.js";

import {
  createClass,
  getClasses,
  getClassById,
  updateClass,
  deleteClass,
} from "../services/class.service.js";

const createClassController = asyncHandler(async (req, res) => {
  const classRecord = await createClass(req.validated.body);

  res.status(201).json({
    success: true,
    data: classRecord,
  });
  console.log("Class created successfully:", classRecord);
});

const getClassesController = asyncHandler(async (req, res) => {
  const classes = await getClasses();

  res.status(200).json({
    success: true,
    data: classes,
  });
  console.log("Classes retrieved successfully:", classes);
});

const getClassController = asyncHandler(async (req, res) => {
  const classRecord = await getClassById(req.validated.params.id);

  res.status(200).json({
    success: true,
    data: classRecord,
  });
  console.log("Class retrieved successfully:", classRecord);
});

const updateClassController = asyncHandler(async (req, res) => {
  const classRecord = await updateClass(
    req.validated.params.id,
    req.validated.body,
  );

  res.status(200).json({
    success: true,
    data: classRecord,
  });
  console.log("Class updated successfully:", classRecord);
});

const deleteClassController = asyncHandler(async (req, res) => {
  await deleteClass(req.validated.params.id);

  res.status(201).send({
    success: true,
    message: "Class deleted successfully",
  });
  console.log("Class deleted successfully:", req.validated.params.id);
});

export {
  createClassController,
  getClassesController,
  getClassController,
  updateClassController,
  deleteClassController,
};
