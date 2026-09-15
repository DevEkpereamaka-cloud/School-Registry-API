import express from "express";

import {
  createEnrollmentController,
  getEnrollmentsController,
  getEnrollmentController,
  updateEnrollmentController,
} from "../controllers/enrollment.controller.js";

import validate from "../middlewares/validate.middleware.js";

import {
  createEnrollmentSchema,
  updateEnrollmentSchema,
  enrollmentIdSchema,
} from "../validators/enrollment.validator.js";
import authenticate from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorize("admin"),
  validate({
    body: createEnrollmentSchema,
  }),
  createEnrollmentController,
);

router.get(
  "/",
  authenticate,
  authorize("admin", "teacher"),
  getEnrollmentsController,
);

router.get(
  "/:id",
  authenticate,
  authorize("admin", "teacher"),
  validate({
    params: enrollmentIdSchema,
  }),
  getEnrollmentController,
);

router.patch(
  "/:id",
  authenticate,
  authorize("admin"),
  validate({
    params: enrollmentIdSchema,
    body: updateEnrollmentSchema,
  }),
  updateEnrollmentController,
);

export default router;
