import asyncHandler from "../utils/asyncHandler.js";

import {
  createEnrollment,
  getEnrollments,
  getEnrollmentById,
  updateEnrollment,
} from "../services/enrollment.service.js";

const createEnrollmentController = asyncHandler(async (req, res) => {
  const enrollment = await createEnrollment(req.validated.body);
  console.log("Enrollment created successfully:", enrollment);
  res.status(201).json({
    success: true,
    data: enrollment,
  });
});

const getEnrollmentsController = asyncHandler(async (req, res) => {
  const enrollments = await getEnrollments();

  res.status(200).json({
    success: true,
    data: enrollments,
  });
  console.log("Enrollments retrieved successfully:", enrollments);
});

const getEnrollmentController = asyncHandler(async (req, res) => {
  const enrollment = await getEnrollmentById(req.validated.params.id);

  res.status(200).json({
    success: true,
    data: enrollment,
  });
  console.log("Enrollment retrieved successfully:", enrollment);
});

const updateEnrollmentController = asyncHandler(async (req, res) => {
  const enrollment = await updateEnrollment(
    req.validated.params.id,
    req.validated.body,
  );

  res.status(200).json({
    success: true,
    data: enrollment,
  });
  console.log("Enrollment updated successfully:", enrollment);
});

export {
  createEnrollmentController,
  getEnrollmentsController,
  getEnrollmentController,
  updateEnrollmentController,
};
