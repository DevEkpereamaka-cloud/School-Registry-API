import asyncHandler from "../utils/asyncHandler.js";

import {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../services/student.service.js";

const createStudentController = asyncHandler(async (req, res) => {
  const student = await createStudent(req.validated.body);

  res.status(201).json({
    success: true,
    data: student,
  });
  console.log("Student created successfully:", student);
});

const getStudentsController = asyncHandler(async (req, res) => {
  const students = await getStudents();

  res.status(200).json({
    success: true,
    data: students,
  });
  console.log("Students retrieved successfully:", students);
});

const getStudentController = asyncHandler(async (req, res) => {
  const student = await getStudentById(req.validated.params.id);

  res.status(200).json({
    success: true,
    data: student,
  });
  console.log("Student retrieved successfully:", student);
});

const updateStudentController = asyncHandler(async (req, res) => {
  const student = await updateStudent(
    req.validated.params.id,
    req.validated.body,
  );

  res.status(200).json({
    success: true,
    data: student,
  });
  console.log("Student updated successfully:", student);
});

const deleteStudentController = asyncHandler(async (req, res) => {
  await deleteStudent(req.validated.params.id);

  res.status(200).json({
    success: true,
    message: "Student deleted successfully",
  });
  console.log("Student deleted successfully");
});

export {
  createStudentController,
  getStudentsController,
  getStudentController,
  updateStudentController,
  deleteStudentController,
};
