import { NextFunction, Response } from "express"

export const allowedProcess = (...role:string[])=>{
    return (req:any,res:Response,next:NextFunction)=>{
        if(!role.includes(req.user.role)){
            res.status(405).json({status:"fail",message:"this process is not allowed"})
        }else{
            next()
        }
    }
}