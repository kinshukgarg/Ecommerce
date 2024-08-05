export const errorMiddleware = (err, req, resp, next) => {
    err.message || (err.message = "Internal server error");
    err.statusCode || (err.statusCode = 500);
    return resp.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};
export const TryCatch = (func) => (req, res, next) => {
    return Promise.resolve(func(req, res, next)).catch(next);
};
