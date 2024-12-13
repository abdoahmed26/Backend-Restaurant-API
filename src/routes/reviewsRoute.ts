import express from "express"
import { verifyToken } from "../middleware/verifyToken";
import { createReview, deleteReview, getReviews, updateReview } from "../controllers/reviewsControllers";
import { reviewsValidation } from "../utils/validators/reviewsValidation";
import { errorValidation } from "../utils/validators/errorValidation";

export const reviewsRouter = express.Router();

reviewsRouter.route("/:id")  //** id => food id 
.get(verifyToken,getReviews)
.post(verifyToken,reviewsValidation,errorValidation,createReview)

reviewsRouter.route("/:id")  //** id => review id
.put(verifyToken,updateReview)
.delete(verifyToken,deleteReview)