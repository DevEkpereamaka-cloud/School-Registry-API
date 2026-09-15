import asyncHandler from "../utils/asyncHandler.js";

import { loginUser } from "../services/auth.service.js";

const loginController = asyncHandler(async (req, res) => {
  const result = await loginUser(req.validated.body);

  res.status(200).json({
    success: true,
    data: result,
  });
});

export { loginController };
