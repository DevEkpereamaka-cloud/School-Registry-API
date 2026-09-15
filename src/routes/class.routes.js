import express from "express";

import {
  createClassController,
  getClassesController,
  getClassController,
  updateClassController,
  deleteClassController,
} from "../controllers/class.controller.js";

import validate from "../middlewares/validate.middleware.js";

import {
  createClassSchema,
  updateClassSchema,
  classIdSchema,
} from "../validators/class.validator.js";
import authenticate from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorize("admin"),
  validate({
    body: createClassSchema,
  }),
  createClassController,
);

router.get(
  "/",
  authenticate,
  authorize("admin", "teacher"),
  getClassesController,
);

router.get(
  "/:id",
  authenticate,
  authorize("admin", "teacher"),
  validate({
    params: classIdSchema,
  }),
  getClassController,
);

router.patch(
  "/:id",
  authenticate,
  authorize("admin"),
  validate({
    params: classIdSchema,
    body: updateClassSchema,
  }),
  updateClassController,
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  validate({
    params: classIdSchema,
  }),
  deleteClassController,
);

export default router;
