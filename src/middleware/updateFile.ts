import { NextFunction, Request, Response } from "express"
import { uploadFile } from "./uploadFile"
import pool from "../models/db"

export const updateFile = (table:string,column:string)=>{
    return async(req:Request, res:Response, next:NextFunction)=>{
        try {
            if(req.file){
                const result = await uploadFile(req.file.buffer)
                if(!result){
                    res.status(400).json({status:"fail",message:"file upload failed"})
                }
                else{
                    const query = `UPDATE ${table} SET ${column}='${result.url}' WHERE id=${req.params.id}`
                    await pool.query(query)
                    next()
                }
            }else{
                next()
            }
        } catch (error:any) {
            res.status(404).json({status:"error",message:error.message})
        }
    }
}