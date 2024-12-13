import express from "express"
import { verifyToken } from "../middleware/verifyToken";
import { addToCart, deleteCart, getCarts, updateCart } from "../controllers/cartsControllers";

export const cartRouter = express.Router();

cartRouter.route("/")
.get(verifyToken,getCarts)

cartRouter.post("/:id",verifyToken,addToCart)

cartRouter.route("/:id")
.put(verifyToken,updateCart)
.delete(verifyToken,deleteCart)