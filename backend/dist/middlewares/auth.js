import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "./error.js";
import { User } from "../models/user.js";
export const adminOnly = TryCatch(async (req, res, next) => {
    const { id } = req.quey;
    if (!id)
        return next(new Errorhandler("wtf", 401));
    const user = await User.findById(id);
    if (!user)
        return next(new ErrorHandler("how dare to use fake id", 401));
    if (user.role !== "admin")
        return next(new ErrorHandler("how dare", 401));
});
