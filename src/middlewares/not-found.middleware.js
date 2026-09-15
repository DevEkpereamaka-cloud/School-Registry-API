import ApiError from "../utils/Apierror.js";

const notFoundMiddleware = (req, res, next) => {
    next(
        new ApiError(
            404,
            `Route ${req.method} ${req.originalUrl} not found`
        )
    );
};

export default notFoundMiddleware;