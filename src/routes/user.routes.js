import express from "express";

import authenticate from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";

import {
  getCurrentUserController,
  getUsersController,
  createTeacherController,
  updateUserStatusController,
} from "../controllers/user.controller.js";

import validate from "../middlewares/validate.middleware.js";

import {
  createTeacherSchema,
  userIdSchema,
  updateUserStatusSchema,
} from "../validators/user.validator.js";

const router = express.Router();

router.get("/me", authenticate, getCurrentUserController);

router.get("/", authenticate, authorize("admin"), getUsersController);

router.post(
  "/teachers",
  authenticate,
  authorize("admin"),
  validate({
    body: createTeacherSchema,
  }),
  createTeacherController,
);

router.patch(
  "/:id/status",
  authenticate,
  authorize("admin"),
  validate({
    params: userIdSchema,
    body: updateUserStatusSchema,
  }),
  updateUserStatusController,
);

export default router;
