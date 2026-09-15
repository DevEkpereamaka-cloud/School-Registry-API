import express from "express";

import {
  createStudentController,
  getStudentsController,
  getStudentController,
  updateStudentController,
  deleteStudentController,
} from "../controllers/student.controller.js";

import validate from "../middlewares/validate.middleware.js";

import {
  createStudentSchema,
  updateStudentSchema,
  studentIdSchema,
} from "../validators/student.validator.js";
import authenticate from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorize("admin"),
  validate({
    body: createStudentSchema,
  }),
  createStudentController,
);

router.get("/", authenticate, authorize("admin"), getStudentsController);

router.get(
  "/:id",
  authenticate,
  authorize("admin", "teacher"),
  validate({
    params: studentIdSchema,
  }),
  getStudentController,
);

router.patch(
  "/:id",
  authenticate,
  authorize("admin"),
  validate({
    params: studentIdSchema,
    body: updateStudentSchema,
  }),
  updateStudentController,
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  validate({
    params: studentIdSchema,
  }),
  deleteStudentController,
);

export default router;
