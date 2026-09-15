import express from "express";

import {
  createClassSubjectController,
  getClassSubjectsController,
  getClassSubjectController,
  updateClassSubjectController,
  deleteClassSubjectController,
} from "../controllers/class-subject.controller.js";

import validate from "../middlewares/validate.middleware.js";

import {
  createClassSubjectSchema,
  updateClassSubjectSchema,
  classSubjectIdSchema,
} from "../validators/class-subject.validator.js";
import authenticate from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorize("admin"),
  validate({
    body: createClassSubjectSchema,
  }),
  createClassSubjectController,
);

router.get(
  "/",
  authenticate,
  authorize("admin", "teacher"),
  getClassSubjectsController,
);

router.get(
  "/:id",
  authenticate,
  authorize("admin", "teacher"),
  validate({
    params: classSubjectIdSchema,
  }),
  getClassSubjectController,
);

router.patch(
  "/:id",
  authenticate,
  authorize("admin"),
  validate({
    params: classSubjectIdSchema,
    body: updateClassSubjectSchema,
  }),
  updateClassSubjectController,
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  validate({
    params: classSubjectIdSchema,
  }),
  deleteClassSubjectController,
);

export default router;
