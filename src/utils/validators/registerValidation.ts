import { body } from "express-validator";

export const registerValidation = [
    body("username")
        .notEmpty()
        .withMessage("username is required"),
    body("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("email must be valid"),
    body("telephone")
        .notEmpty()
        .withMessage("telephone is required"),
    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6,max: 20 })
        .withMessage("password must be at least 6 characters and at most 20 characters")
]