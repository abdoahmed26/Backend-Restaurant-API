import { Response } from "express"
import pool from "../models/db"
import { uploadFile } from "../middleware/uploadFile"

export const getUser = async(req:any,res:Response)=>{
    try {
        const userId = req.user.id
        const query = `SELECT id,username,email,telephone,profile_img,role,created_at FROM users WHERE id=${userId};`
        const users = await pool.query(query)
        res.status(200).json({status:"success",data:users.rows[0]})
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const updateUser = async(req:any,res:Response)=>{
    try {
        const userId = req.user.id
        if(req.file){
                const result = await uploadFile(req.file.buffer)
                if(result){
                    const query = `UPDATE users SET profile_img='${result.url}' WHERE id=${userId};`
                    await pool.query(query)
                }
                else{
                    res.status(400).json({status:"fail",message:"file upload failed"})
                }
        }
        const updateValues = Object.keys(req.body).map((key,index)=> `${key}=$${index+1}`).join(",")
        const values = Object.values(req.body)
        if(values.length > 0){
            const query = `UPDATE users SET ${updateValues} WHERE id=${userId} RETURNING *;`
            const user =  await pool.query(query,values)
            const userData = user.rows[0]
            delete userData.password
            res.status(200).json({status:"success",message:"user updated successfully",data:userData})
        }
        else{
            const query = `SELECT * FROM users WHERE id=${userId};`
            const user = await pool.query(query)
            delete user.rows[0].password
            res.status(200).json({status:"success",data:user.rows[0]})
        }
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const deleteUser = async(req:any,res:Response)=>{
    try {
        const userId = req.user.id
        const query = `DELETE FROM users WHERE id=${userId};`
        await pool.query(query)
        res.status(200).json({status:"success",message:"user deleted successfully"})
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}