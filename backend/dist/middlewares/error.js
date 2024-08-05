export const errorMiddleware = (err, req, resp, next) => {
    err.message || (err.message = "Internal server error");
    err.statusCode || (err.statusCode = 500);
    return resp.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};
export const TryCatch = (func) => (req, resp, next) => {
    return Promise.resolve(func(req, resp, next)).catch((next) => {
    });
};
