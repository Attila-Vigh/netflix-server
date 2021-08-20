import { checkSchema, validationResult } from "express-validator";
import createError from "http-errors";

const reviewsSchema = {
	comment: {
		in: ["body"],
		isString: {
			errorMessage: "Comment must be string!",
		},
	},
	rate: {
		in: ["body"],
		isString: {
			errorMessage: "Rate  must be a array",
		},
	},
};

export const checkReviewsSchema = checkSchema(reviewsSchema);

export const validateReviewsSchema = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		next(createError(400, "Validation error", errors));
	}
	next();
};
