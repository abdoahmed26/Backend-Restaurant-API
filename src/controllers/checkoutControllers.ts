import Stripe from "stripe";
import dotenv from "dotenv"
import { Response } from "express";
import pool from "../models/db";

dotenv.config()

const stripe = new Stripe(process.env.STRIPE_SCRET_KEY as string)

export const createPayment = async (req:any, res: Response)=>{
    try {
        const { amount,currency} = req.body;
        const payment = await stripe.paymentIntents.create({
            amount:amount,
            currency,
            payment_method_types: ['card']
        })
        res.status(200).json({status:"success",data:{
            client_secret : payment.client_secret
        }})
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const handlePayment = async (req:any, res:Response)=>{
    try {
        const userId = req.user.id
        const { payment_id } = req.body
        const paymentIntent = await stripe.paymentIntents.retrieve(payment_id)
        // console.log(paymentIntent);
        if(paymentIntent.status === 'succeeded'){
            const insertQuery = `
                INSERT INTO orders (user_id, food_id, qty)
                SELECT user_id, food_id, qty FROM carts WHERE user_id = $1
                RETURNING *;
            `
            const result = await pool.query(insertQuery, [userId]);
            const deleteQuery = "DELETE FROM carts WHERE user_id = $1";
            await pool.query(deleteQuery, [userId]);
            res.status(200).json({status:"success",message:"Payment successful",orders: result.rows})
        } else {
            res.status(400).json({status:"fail",message:"Payment failed"})
        }
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}