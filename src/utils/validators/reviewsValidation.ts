import { body } from "express-validator";

export const reviewsValidation = [
    body("review")
        .notEmpty()
        .withMessage("review is required"),
    body("rate")
        .notEmpty()
        .withMessage("rate is required")
]