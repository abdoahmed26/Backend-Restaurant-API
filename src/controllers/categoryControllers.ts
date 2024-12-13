import { Request, Response } from "express"
import pool from "../models/db"
import { uploadFile } from "../middleware/uploadFile"

export const createCategory = async (req:any,res:Response) => {
    try {
        const { name, description } = req.body
        if(!req.file){
            res.status(400).json({status:"fail",message:"Please upload a file"})
        }
        else{
            const result = await uploadFile(req.file.buffer)
            const query = `INSERT INTO categories (name, description,category_img) VALUES ('${name}', '${description}','${result?.url}') RETURNING *;`
            const category = await pool.query(query)
            res.status(200).json({status:"success",data:category.rows[0]})
        }
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const getCategories = async (req:any,res:Response) => {
    try {
        const query = `SELECT * FROM categories;`
        const categories = await pool.query(query)
        res.status(200).json({status:"success",data:categories.rows})
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const updateCategory = async (req:Request, res:Response) => {
    try {
        const { id } = req.params
        const values = Object.values(req.body)
        const updateKeys = Object.keys(req.body).map((key,index) => `${key}='${values[index]}'`).join(",")
        if(values.length > 0) {
            const query = `UPDATE categories SET ${updateKeys} WHERE id=${id};`
            await pool.query(query)
        }
        res.status(200).json({status:"success",message:"category updated successfully"})
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const deleteCategory = async (req:Request, res:Response) => {
    try {
        const query = `DELETE FROM categories WHERE id=${req.params.id};`
        await pool.query(query)
        res.status(200).json({status:"success",message:"category deleted successfully"})
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}