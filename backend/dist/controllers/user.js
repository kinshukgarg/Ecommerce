import { User } from "../models/user.js";
export const newUser = async (req, res, next) => {
    try {
        throw new Error("aaa");
        const { name, email, photo, gender, _id, dob } = req.body; //role,
        // console.log(name,email,photo,gender,_id,dob)
        await User.create({
            name,
            email,
            photo,
            gender,
            _id,
            dob: new Date(dob),
        });
        return res.status(200).json({
            success: true,
            message: `Welcome, ${User.name}`,
        });
    }
    catch (error) {
        next(error);
    }
};
