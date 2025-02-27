import express from "express"
import { verifyToken } from "../middleware/verifyToken"
import { upload } from "../middleware/uploadFile"
import { errorValidation } from "../utils/validators/errorValidation"
import { categoryValidation } from "../utils/validators/categoryValidation"
import { allowedProcess } from "../middleware/allowedProcess"
import { createCategory, deleteCategory, getCategories, updateCategory } from "../controllers/categoryControllers"
import { updateFile } from "../middleware/updateFile"

export const categoryRouter = express.Router()

categoryRouter.route("/")
.get(getCategories)
.post(verifyToken,allowedProcess("admin","manager"),upload.single("category_img"),categoryValidation,errorValidation,createCategory)

categoryRouter.route("/:id")
.put(verifyToken,allowedProcess("admin","manager"),upload.single("category_img"),updateFile("categories","category_img"),updateCategory)
.delete(verifyToken,allowedProcess("admin","manager"),deleteCategory)