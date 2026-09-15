import express from "express";

import {
  createSession,
  getSessions,
  getSession,
  updateSession,
  deleteSession,
} from "../controllers/academic-session.controller.js";

import validate from "../middlewares/validate.middleware.js";

import {
  createAcademicSessionSchema,
  updateAcademicSessionSchema,
  academicSessionIdSchema,
} from "../validators/academic-session.validator.js";

import authenticate from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorize("admin"),
  validate({
    body: createAcademicSessionSchema,
  }),
  createSession,
);

router.get("/", authenticate, authorize("admin", "user"), getSessions);

router.get(
  "/:id",
  authenticate,
  authorize("admin", "user"),
  validate({
    params: academicSessionIdSchema,
  }),
  getSession,
);

router.patch(
  "/:id",
  authenticate,
  authorize("admin"),
  validate({
    params: academicSessionIdSchema,
    body: updateAcademicSessionSchema,
  }),
  updateSession,
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  validate({
    params: academicSessionIdSchema,
  }),
  deleteSession,
);

export default router;
