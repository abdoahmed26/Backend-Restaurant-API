import { Request, Response } from "express";
import pool from "../models/db";

export const getWishlists = async (req: Request, res: Response) => {
    try {
        const id = (req as any).user.id
        const query = `SELECT wishlists.id,food_id,foods.food_img,foods.name,foods.price,wishlists.created_at FROM wishlists INNER JOIN foods ON wishlists.food_id = foods.id WHERE user_id=${id};`
        const carts = await pool.query(query)
        res.status(200).json({status:"success",data:carts.rows,length:carts.rowCount})
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const addToWishlist = async (req: Request, res: Response) => {
    try {
        const id = (req as any).user.id
        const search = `SELECT * FROM wishlists WHERE food_id = ${req.params.id} AND user_id = ${id};`
        const result = await pool.query(search)
        if(result.rows.length > 0) {
            const query = `DELETE FROM wishlists WHERE food_id=${req.params.id} AND user_id=${id}`
            await pool.query(query)
            const query2 = `SELECT wishlists.id,food_id,foods.food_img,foods.name,foods.price,wishlists.created_at FROM wishlists INNER JOIN foods ON wishlists.food_id = foods.id WHERE user_id=${id};`
            const wishlists = await pool.query(query2)
            res.status(200).json({status:"success",message:"food removed from wishlist successfully",data:wishlists.rows,length:wishlists.rowCount})
        }
        else{
            const query = `INSERT INTO wishlists (food_id,user_id) VALUES ('${req.params.id}','${id}')`
            await pool.query(query)
            const query2 = `SELECT wishlists.id,food_id,foods.food_img,foods.name,foods.price,wishlists.created_at FROM wishlists INNER JOIN foods ON wishlists.food_id = foods.id WHERE user_id=${id};`
            const wishlists = await pool.query(query2)
            res.status(201).json({status:"success",message:"food added to wishlist successfully",data:wishlists.rows,length:wishlists.rowCount})
        }
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const deleteWishlist = async (req: Request, res: Response) => {
    try {
        const id = (req as any).user.id
        const query = `DELETE FROM wishlists WHERE id=${req.params.id};`
        await pool.query(query)
        const query2 = `SELECT wishlists.id,food_id,foods.food_img,foods.name,foods.price,wishlists.created_at FROM wishlists INNER JOIN foods ON wishlists.food_id = foods.id WHERE user_id=${id};`
        const wishlists = await pool.query(query2)
        res.status(200).json({status:"success",message:"wishlist deleted successfully",data:wishlists.rows,length:wishlists.rowCount})
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}