import { Request, Response } from "express";
import pool from "../models/db";
import { uploadFile } from "../middleware/uploadFile";

export const getFoods = async(req:Request,res:Response)=>{
    try {
        const limit = req.query.limit || 5;
        const page = req.query.page || 1;
        const offset = (+page - 1) * +limit;
        const query = `SELECT * FROM foods LIMIT ${limit} OFFSET ${offset};`
        const allFoods = await pool.query(query)
        res.status(200).json({status:"success",data:allFoods.rows})
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const createFood = async(req:Request,res:Response)=>{
    try {
        if(!req.file){
            res.status(400).json({status:"fail",message:"Please upload a file"})
        }
        else{
            const result = await uploadFile(req.file.buffer)
            if(!result){
                res.status(400).json({status:"fail",message:"file upload failed"})
            }
            else{
                const values = Object.values(req.body).map(ele=>`'${ele}'`).join(",")
                const keys = Object.keys(req.body).join(",")
                const query = `INSERT INTO foods (${keys},food_img) VALUES (${values},'${result.url}') RETURNING *;`
                const newFood = await pool.query(query)
                res.status(200).json({status:"success",data:newFood.rows[0]})
            }
        }
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const getFoodById = async(req:any,res:Response)=>{
    try {
        const query = `SELECT * FROM foods WHERE id=${req.params.id};`
        const food = await pool.query(query)
        res.status(200).json({status:"success",data:food.rows[0]})
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const updateFood = async(req:Request,res:Response)=>{
    try {
        const { id } = req.params
        const values = Object.values(req.body)
        const updateKeys = Object.keys(req.body).map((key,index) => `${key}='${values[index]}'`).join(",")
        if(values.length > 0) {
            const query = `UPDATE foods SET ${updateKeys} WHERE id=${id};`
            await pool.query(query)
        }
        res.status(200).json({status:"success",message:"food updated successfully"})
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const deleteFood = async(req:Request,res:Response)=>{
    try {
        const query = `DELETE FROM foods WHERE id=${req.params.id};`
        await pool.query(query)
        res.status(200).json({status:"success",message:"the food was successfully deleted"})
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}