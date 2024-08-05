export const errorMiddleware = (err, req, resp, next) => {
    err.message || (err.message = "");
    return resp.status(400).json({
        success: false,
        message: "Some Error"
    });
};
