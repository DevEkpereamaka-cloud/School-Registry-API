import express from "express";

import {
  createTeacherController,
  getTeachersController,
  getTeacherController,
  updateTeacherController,
  deleteTeacherController,
} from "../controllers/teacher.controller.js";

import validate from "../middlewares/validate.middleware.js";

import {
  createTeacherSchema,
  updateTeacherSchema,
  teacherIdSchema,
} from "../validators/teacher.validator.js";
import authenticate from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorize("admin"),
  validate({
    body: createTeacherSchema,
  }),
  createTeacherController,
);

router.get(
  "/",
  authenticate,
  authorize("admin", "teacher"),
  getTeachersController,
);

router.get(
  "/:id",
  authenticate,
  authorize("admin", "teacher"),
  validate({
    params: teacherIdSchema,
  }),
  getTeacherController,
);

router.patch(
  "/:id",
  authenticate,
  authorize("admin"),
  validate({
    params: teacherIdSchema,
    body: updateTeacherSchema,
  }),
  updateTeacherController,
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  validate({
    params: teacherIdSchema,
  }),
  deleteTeacherController,
);

export default router;
