import asyncHandler from "../utils/asyncHandler.js";

import {
  createTeacher,
  getTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
} from "../services/teacher.service.js";

const createTeacherController = asyncHandler(async (req, res) => {
  const teacher = await createTeacher(req.validated.body);

  res.status(201).json({
    success: true,
    data: teacher,
  });
  console.log("Teacher created successfully:", teacher);
});

const getTeachersController = asyncHandler(async (req, res) => {
  const teachers = await getTeachers();

  res.status(200).json({
    success: true,
    data: teachers,
  });
  console.log("Teachers retrieved successfully:", teachers);
});

const getTeacherController = asyncHandler(async (req, res) => {
  const teacher = await getTeacherById(req.validated.params.id);

  res.status(200).json({
    success: true,
    data: teacher,
  });
  console.log("Teacher retrieved successfully:", teacher);
});

const updateTeacherController = asyncHandler(async (req, res) => {
  const teacher = await updateTeacher(
    req.validated.params.id,
    req.validated.body,
  );

  res.status(200).json({
    success: true,
    data: teacher,
  });
  console.log("Teacher updated successfully:", teacher);
});

const deleteTeacherController = asyncHandler(async (req, res) => {
  await deleteTeacher(req.validated.params.id);

  res.status(201).send({
    success: true,
    message: "Teacher deleted successfully",
  });
  console.log("Teacher deleted successfully:", req.validated.params.id);
});

export {
  createTeacherController,
  getTeachersController,
  getTeacherController,
  updateTeacherController,
  deleteTeacherController,
};
