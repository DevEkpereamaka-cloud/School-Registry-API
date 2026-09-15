import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { comparePassword } from "../utils/password.js";
import { generateAccessToken } from "../utils/token.js";

const loginUser = async (data) => {
  const user = await User.findOne({
    email: data.email,
  }).select("+passwordHash");

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  if (!user.isActive) {
    throw new ApiError(403, "User account is inactive");
  }

  const passwordMatches = await comparePassword(
    data.password,
    user.passwordHash,
  );

  if (!passwordMatches) {
    throw new ApiError(401, "Invalid email or password");
  }

  const accessToken = generateAccessToken(user);

  return {
    accessToken,

    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    },
  };
};

export { loginUser };
