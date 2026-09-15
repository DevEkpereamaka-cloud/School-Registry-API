import asyncHandler from "../utils/asyncHandler.js";

import {
  getUsers,
  createTeacher,
  updateUserStatus,
} from "../services/user.service.js";

const getCurrentUserController = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      id: req.user._id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      role: req.user.role,
      isActive: req.user.isActive,
    },
  });
});

const getUsersController = asyncHandler(async (req, res) => {
  const users = await getUsers();

  res.status(200).json({
    success: true,
    data: users,
  });
});

const createTeacherController = asyncHandler(async (req, res) => {
  const teacher = await createTeacher(req.validated.body);

  res.status(201).json({
    success: true,
    data: teacher,
  });
});

const updateUserStatusController = asyncHandler(async (req, res) => {
  const user = await updateUserStatus(
    req.validated.params.id,
    req.validated.body.isActive,
    req.user._id,
  );

  res.status(200).json({
    success: true,
    data: user,
  });
});

export {
  getCurrentUserController,
  getUsersController,
  createTeacherController,
  updateUserStatusController,
};
