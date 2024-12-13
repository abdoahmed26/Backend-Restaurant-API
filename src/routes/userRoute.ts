import express from "express"
import { verifyToken } from "../middleware/verifyToken"
import { deleteUser, getUser, updateUser } from "../controllers/userControllers"
import { upload } from "../middleware/uploadFile"

export const userRouter = express.Router()

userRouter.route("/")
.get(verifyToken,getUser)
.put(verifyToken,upload.single("profile_img"),updateUser)
.delete(verifyToken,deleteUser)
