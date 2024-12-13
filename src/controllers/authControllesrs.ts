import { Request, Response } from "express"
import pool from "../models/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config()

export const register = async(req:Request,res:Response)=>{
    try {
        const {username,email,telephone,password} = req.body
        const query = `SELECT * FROM users WHERE email='${email}';`
        const user = await pool.query(query)
        if(user.rows.length > 0){
            res.status(400).json({status:"fail",message:"user already exist"})
        }else{
            const hashPassword = await bcrypt.hash(password,10)
            const addUser = `INSERT INTO users (username,email,telephone,password) VALUES ('${username}','${email}','${telephone}','${hashPassword}');`
            await pool.query(addUser)
            res.status(201).json({status:"success",message:"user created successfully"})
        }
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const login = async(req:Request,res:Response)=>{
    try {
        const {email,password} = req.body;
        const query = `SELECT * FROM users WHERE email='${email}';`
        const user = await pool.query(query)
        if(user.rows.length === 0){
            res.status(400).json({status:"fail",message:"user does not exist"})
        }else{
            const isMatch = await bcrypt.compare(password,user.rows[0].password)
            if(isMatch){
                const token = jwt.sign({id:user.rows[0].id,username:user.rows[0].username,email:user.rows[0].email,role:user.rows[0].role},process.env.JWT_SECRET as string,{expiresIn:"1d"})
                res.status(200).json({status:"success",message:"user logged in successfully",data:{token}})
            }
            else{
                res.status(400).json({status:"fail",message:"email or password is incorrect"})
            }
        }
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}