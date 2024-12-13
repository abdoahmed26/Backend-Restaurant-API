import { body } from "express-validator";

export const foodsValidation = [
    body("name")
        .notEmpty()
        .withMessage("name is required"),
    body("description")
        .notEmpty()
        .withMessage("description is required"),
    body("price")
        .notEmpty()
        .withMessage("price is required"),
    body("category_id")
        .notEmpty()
        .withMessage("category_id is required"),
]