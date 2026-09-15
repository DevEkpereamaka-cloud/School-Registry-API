import ApiError from "../utils/Apierror.js";

const validate = ({ body, params, query } = {}) => {
    return (req, res, next) => {
        try {
            const validated = {};

            if (body) {
                validated.body = body.parse(req.body);
            }

            if (params) {
                validated.params = params.parse(req.params);
            }

            if (query) {
                validated.query = query.parse(req.query);
            }

            req.validated = validated;

            next();
        } catch (error) {
            if (error.name === "ZodError") {
                const message = error.issues
                    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
                    .join("; ");

                return next(new ApiError(400, message));
            }

            next(error);
        }
    };
};

export default validate;