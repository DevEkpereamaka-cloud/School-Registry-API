const errorMiddleware = (error, req, res, next) => {
    let statusCode = error.statusCode || 500;
    let message = error.message || "Internal server error";

    if (error.code === 11000) {
        statusCode = 409;

        const duplicatedField = Object.keys(
            error.keyPattern || {}
        )[0];

        message = duplicatedField
            ? `A record with this ${duplicatedField} already exists`
            : "A record with the provided value already exists";
    }

    if (error.name === "ValidationError") {
        statusCode = 400;

        message = Object.values(error.errors)
            .map((validationError) => validationError.message)
            .join("; ");
            console.log("Validation error:", message);
    }

    if (error.name === "CastError") {
        statusCode = 400;
        message = `Invalid value for ${error.path}`;
        console.log("Cast error:", message);
    }

    if (statusCode >= 500) {
        console.error(error);
    }
    console.log(`Error occurred: ${message} (Status Code: ${statusCode})`);

    res.status(statusCode).json({
        success: false,
        message
    });
};

export default errorMiddleware;