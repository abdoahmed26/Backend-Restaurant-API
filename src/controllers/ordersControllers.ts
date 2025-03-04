import { Response } from "express"
import pool from "../models/db"

export const getMyOrders = async (req:any, res:Response)=>{
    try {
        const query = `
        SELECT orders.id,food_id,foods.food_img,foods.name,foods.price,orders.created_at,qty,status FROM orders INNER JOIN foods ON orders.food_id = foods.id 
        WHERE user_id=${req.user.id};
        `
        const result = await pool.query(query)
        res.status(200).json({status:"success",data:result.rows})
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}
export const getAllOrders = async (req:any, res:Response)=>{
    try {
        const query = `
        SELECT 
        orders.id,food_id,orders.created_at,qty,status,user_id,
        foods.food_img,foods.name,foods.price,
        users.username,users.profile_img,users.telephone,users.email,users.role
        FROM orders 
        INNER JOIN foods ON orders.food_id = foods.id
        INNER JOIN users ON orders.user_id = users.id;`
        const result = await pool.query(query)
        res.status(200).json({status:"success",data:result.rows})
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const updateOrder = async (req:any, res:Response)=>{
    try {
        const {id} = req.params
        const updateValues = Object.keys(req.body).map((key,index)=> `${key}=$${index+1}`).join(",")
        const values = Object.values(req.body)
        const query = `UPDATE orders SET ${updateValues} WHERE id=${id} RETURNING *;`
        const result = await pool.query(query,values)
        res.status(200).json({status:"success",data:result.rows[0]})
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}