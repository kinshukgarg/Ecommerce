import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.js";
import { NewUserRequestBody } from "../types/types.js";

export const newUser = async (
  req: Request<{}, {}, NewUserRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    return next(new Error("Error created"))
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
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error,
    });
  }
};
