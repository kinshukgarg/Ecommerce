export const errorMiddleware = (err, req, resp, next) => {
    err.message || (err.message = "Internal server error");
    err.message || (err.message = "Internal server error");
    return resp.status(400).json({
        success: false,
        message: "Some Error"
    });
};
