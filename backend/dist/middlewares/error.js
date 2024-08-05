export const errorMiddleware = (err, req, resp, next) => {
    err.message || (err.message = "Internal server error");
    err.statusCode || (err.statusCode = 500);
    return resp.status(400).json({
        success: false,
        message: "Some Error"
    });
};
