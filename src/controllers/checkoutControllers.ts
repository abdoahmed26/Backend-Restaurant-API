import Stripe from "stripe";
import dotenv from "dotenv"
import { Response } from "express";

dotenv.config()

const stripe = new Stripe(process.env.STRIPE_SCRET_KEY as string)

export const createPayment = async (req:any, res: Response)=>{
    try {
        const { amount,currency} = req.body;
        const payment = await stripe.paymentIntents.create({
            amount:amount * 100,
            currency,
            payment_method_types: ['card']
        })
        res.status(200).json({status:"success",data:{
            clientSecret : payment.client_secret
        }})
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}

export const handlePayment = async (req:any, res:Response)=>{
    try {
        const { payment_id } = req.body
        const paymentIntent = await stripe.paymentIntents.retrieve(payment_id)
        // console.log(paymentIntent);
        if(paymentIntent.status === 'succeeded'){
            res.status(200).json({status:"success",message:"Payment successful"})
        } else {
            res.status(400).json({status:"fail",message:"Payment failed"})
        }
    } catch (error:any) {
        res.status(404).json({status:"error",message:error.message})
    }
}