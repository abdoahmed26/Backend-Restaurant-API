import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
    if(!req.headers.authorization){
        res.status(401).json({status:"fail",message:"unauthorized access"})
    }
    else{
        const token = req.headers.authorization.split(" ")[1]
        jwt.verify(token,process.env.JWT_SECRET as string,(err:any,user:any)=>{
            if(err){
                res.status(401).json({status:"fail",message:"unauthorized access"})
            }else{
                req.user = user
                next()
            }
        })
    }
}