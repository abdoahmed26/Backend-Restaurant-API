import express from 'express';
import { verifyToken } from '../middleware/verifyToken';
import { addToWishlist, deleteWishlist, getWishlists } from '../controllers/wishlistsControllers';

export const wishlistsRouter = express.Router();

wishlistsRouter.route('/')
.get(verifyToken,getWishlists)

wishlistsRouter.route('/:id')
.post(verifyToken,addToWishlist)
.delete(verifyToken,deleteWishlist)