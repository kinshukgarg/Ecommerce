import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.js";
import { NewUserRequestBody } from "../types/types.js";

import { TryCatch } from "../middlewares/error.js";

export const newUser = TryCatch(async (
  req: Request<{}, {}, NewUserRequestBody>,
  res: Response,
  next: NextFunction
) => {
  const { name, email, photo, gender, _id, dob } = req.body; //role,

  // console.log(name,email,photo,gender,_id,dob)

  const newUser = await User.create({
    name,
    email,
    photo,
    gender,
    _id,
    dob: new Date(dob),
  });

  return res.status(200).json({
    success: true,
    message: `Welcome, ${newUser.name}`,
  });
});
