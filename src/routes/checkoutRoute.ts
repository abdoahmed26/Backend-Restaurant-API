import express from 'express';
import { verifyToken } from '../middleware/verifyToken';
import { createPayment, handlePayment } from '../controllers/checkoutControllers';

export const checkoutRouter = express.Router();

checkoutRouter.post("/create", verifyToken,createPayment)
checkoutRouter.post("/handle", verifyToken,handlePayment)