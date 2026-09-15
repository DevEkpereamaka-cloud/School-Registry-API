import express from "express";

import { loginController } from "../controllers/auth.controller.js";

import validate from "../middlewares/validate.middleware.js";

import { loginSchema } from "../validators/auth.validator.js";

const router = express.Router();

router.post(
  "/login",
  validate({
    body: loginSchema,
  }),
  loginController,
);

export default router;
