import express from "express"
import { verifyToken } from "../middleware/verifyToken"
import { createFood, deleteFood, getFoodById, getFoods, updateFood } from "../controllers/foodsControllers"
import { upload } from "../middleware/uploadFile"
import { foodsValidation } from "../utils/validators/foodsValidation"
import { errorValidation } from "../utils/validators/errorValidation"
import { allowedProcess } from "../middleware/allowedProcess"
import { updateFile } from "../middleware/updateFile"

export const foodsRouter = express.Router()

foodsRouter.route("/")
.get(verifyToken,getFoods)
.post(verifyToken,allowedProcess("admin","manager"),upload.single("food_img"),foodsValidation,errorValidation,createFood)

foodsRouter.route("/:id")
.get(verifyToken,getFoodById)
.put(verifyToken,allowedProcess("admin","manager"),upload.single("food_img"),updateFile("foods","food_img"),updateFood)
.delete(verifyToken,allowedProcess("admin","manager"),deleteFood)