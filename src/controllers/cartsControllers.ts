import { Request, Response } from "express";
import pool from "../models/db";

export const getCarts = async(req:any,res:Response)=>{
    try {
        const query = `SELECT carts.id,food_id,foods.food_img,foods.name,foods.price,carts.created_at,qty FROM carts INNER JOIN foods ON carts.food_id = foods.id WHERE user_id=${req.user.id};`
        const carts = await pool.query(query)
        res.status(200).json({status:"success",data:carts.rows,length:carts.rowCount})
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const addToCart = async(req:any,res:Response)=>{
    try {
        const search = `SELECT * FROM carts WHERE food_id = ${req.params.id};`
        const result = await pool.query(search)
        if(result.rows.length > 0) {
            const query = `UPDATE carts SET qty=${+result.rows[0].qty+1} WHERE food_id=${req.params.id}`
            await pool.query(query)
        }
        else{
            const query = `INSERT INTO carts (food_id,user_id) VALUES ('${req.params.id}','${req.user.id}')`
            await pool.query(query)
        }
        const query = `SELECT carts.id,food_id,foods.food_img,foods.name,foods.price,carts.created_at,qty FROM carts INNER JOIN foods ON carts.food_id = foods.id WHERE user_id=${req.user.id};`
        const carts = await pool.query(query)
        res.status(201).json({status:"success",message:"food added to cart successfully",data:carts.rows,length:carts.rowCount})
    }catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const updateCart = async(req:Request,res:Response)=>{
    try {
        const values = Object.values(req.body)
        const keys = Object.keys(req.body).map((key,index)=> `${key}='${values[index]}'`).join(",")
        const query = `UPDATE carts SET ${keys} WHERE id=${req.params.id} RETURNING *;`
        const updatedCart = await pool.query(query)
        res.status(200).json({status:"success",message:"cart updated successfully",data:updatedCart.rows[0]})
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const deleteCart = async(req:Request,res:Response)=>{
    try {
        const query = `DELETE FROM carts WHERE id=${req.params.id};`
        await pool.query(query)
        res.status(200).json({status:"success",message:"cart deleted successfully"})
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}