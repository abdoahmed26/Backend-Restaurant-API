import express from 'express';
import { verifyToken } from '../middleware/verifyToken';
import { allowedProcess } from '../middleware/allowedProcess';
import { getAllOrders, getMyOrders, updateOrder } from '../controllers/ordersControllers';

export const ordersRouter = express.Router();

ordersRouter.get("/mine",verifyToken,getMyOrders)

ordersRouter.get("/all",verifyToken,allowedProcess("admin","manager"),getAllOrders)

ordersRouter.put("/:id",verifyToken,allowedProcess("admin","manager"),updateOrder)
