import { Request, Response } from "express";
import pool from "../models/db";

export const getReviews = async(req: Request, res: Response)=>{
    try {
        const { id } = req.params;
        const query = `SELECT reviews.id,review,rate,user_id,username,profile_img,reviews.created_at FROM reviews INNER JOIN users ON reviews.user_id = users.id WHERE food_id=${id};`
        const reviews = await pool.query(query)
        res.status(200).json({status:"success",data:reviews.rows})
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const createReview = async(req:any,res:Response)=>{
    try {
        const { review, rate} = req.body;
        const query = `INSERT INTO reviews (review,rate,food_id,user_id) VALUES ('${review}','${rate}','${req.params.id}','${req.user.id}') RETURNING *;`
        const newReview = await pool.query(query)
        res.status(201).json({status:"success",message:"review created successfully",data:newReview.rows[0]})
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const updateReview = async(req:Request, res:Response) => {
    try {
        const values = Object.values(req.body)
        const keys = Object.keys(req.body).map((key,index)=> `${key}='${values[index]}'`).join(", ")
        const query = `UPDATE reviews SET ${keys} WHERE id=${req.params.id} RETURNING *;`
        const updatedReview = await pool.query(query)
        res.status(200).json({status:"success",message:"review updated successfully",data:updatedReview.rows[0]})
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const deleteReview = async(req:Request, res:Response) => {
    try {
        const { id } = req.params;
        const query = `DELETE FROM reviews WHERE id=${id};`
        await pool.query(query)
        res.status(200).json({status:"success",message:"review deleted successfully"})
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}