import express from 'express';
import { registerValidation } from '../utils/validators/registerValidation';
import { errorValidation } from '../utils/validators/errorValidation';
import { login, register } from '../controllers/authControllesrs';
import { loginValidation } from '../utils/validators/loginValidation';

export const authRouter = express.Router();

authRouter.post("/register",registerValidation,errorValidation,register)
authRouter.post("/login",loginValidation,errorValidation,login)