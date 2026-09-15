import User from "../models/user.model.js";
import ApiError from "../utils/Apierror.js";
import {
    verifyAccessToken
} from "../utils/token.js";

const authenticate = async (
    req,
    res,
    next
) => {
    try {
        const authorization =
            req.headers.authorization;

        if (!authorization) {
            throw new ApiError(
                401,
                "Authentication required"
            );
        }

        const [scheme, token] =
            authorization.split(" ");

        if (
            scheme !== "Bearer" ||
            !token
        ) {
            throw new ApiError(
                401,
                "Invalid authentication format"
            );
        }

        const payload =
            verifyAccessToken(token);

        const user =
            await User.findById(
                payload.sub
            );

        if (!user) {
            throw new ApiError(
                401,
                "User account no longer exists"
            );
        }

        if (!user.isActive) {
            throw new ApiError(
                403,
                "User account is inactive"
            );
        }

        req.user = user;

        next();
    } catch (error) {
        if (
            error.name === "JsonWebTokenError" ||
            error.name === "TokenExpiredError"
        ) {
            return next(
                new ApiError(
                    401,
                    "Invalid or expired authentication token"
                )
            );
        }

        next(error);
    }
};

export default authenticate;