import mongoose from "mongoose";

import User from "../models/user.model.js";
import ApiError from "../utils/Apierror.js";
import { hashPassword } from "../utils/password.js";

const sanitizeUser = (user) => {
  return {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

const getUsers = async () => {
  const users = await User.find().sort({
    createdAt: -1,
  });

  return users.map(sanitizeUser);
};

const createTeacher = async (data) => {
  const existingUser = await User.findOne({
    email: data.email,
  });

  if (existingUser) {
    throw new ApiError(409, "An account with this email already exists");
  }

  const passwordHash = await hashPassword(data.password);

  const teacher = await User.create({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    passwordHash,
    role: "teacher",
    isActive: true,
  });

  return sanitizeUser(teacher);
};

const updateUserStatus = async (id, isActive, actingUserId) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid user ID");
  }

  if (id.toString() === actingUserId.toString()) {
    throw new ApiError(400, "You cannot change your own account status");
  }

  const user = await User.findById(id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.role !== "teacher") {
    throw new ApiError(
      400,
      "Only teacher accounts can be managed through this endpoint",
    );
  }

  user.isActive = isActive;

  await user.save();

  return sanitizeUser(user);
};

export { getUsers, createTeacher, updateUserStatus };
