import { NextFunction, Request, Response } from "express";




export const errorMiddleware=(err:Error,req:Request,resp:Response,next:NextFunction)=>{




    err.message ||=""; 
    return resp.status(400).json({
        success:false,
        message:"Some Error"
    })
}