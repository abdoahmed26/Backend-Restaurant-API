import { body } from "express-validator";

export const loginValidation = [
    body("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("email must be valid"),
    body("password")
        .notEmpty()
        .withMessage("Password is required")
]