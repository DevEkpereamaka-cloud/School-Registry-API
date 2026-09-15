import express from "express";

import {
  createSubjectController,
  getSubjectsController,
  getSubjectController,
  updateSubjectController,
  deleteSubjectController,
} from "../controllers/subject.controller.js";

import validate from "../middlewares/validate.middleware.js";

import {
  createSubjectSchema,
  updateSubjectSchema,
  subjectIdSchema,
} from "../validators/subject.validator.js";
import authorize from "../middlewares/authorize.middleware.js";
import authenticate from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorize("admin"),
  validate({
    body: createSubjectSchema,
  }),
  createSubjectController,
);

router.get(
  "/",
  authenticate,
  authorize("admin", "teacher"),
  getSubjectsController,
);

router.get(
  "/:id",
  authenticate,
  authorize("admin", "teacher"),
  validate({
    params: subjectIdSchema,
  }),
  getSubjectController,
);

router.patch(
  "/:id",
  authenticate,
  authorize("admin"),
  validate({
    params: subjectIdSchema,
    body: updateSubjectSchema,
  }),
  updateSubjectController,
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  validate({
    params: subjectIdSchema,
  }),
  deleteSubjectController,
);

export default router;
