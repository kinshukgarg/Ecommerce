import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/utility-class.js";




export const errorMiddleware=(err:ErrorHandler,req:Request,resp:Response,next:NextFunction)=>{




    err.message ||="Internal server error"; 
    err.statusCode ||=500; 
    return resp.status(400).json({
        success:false,
        message:"Some Error"
    })
}