import { checkSchema, validationResult } from "express-validator";
import createError from "http-errors";

const productSchema = {
	name: {
		in: ["body"],
		isString: {
			errorMessage: "Name must be string!",
		},
	},
	description: {
		in: ["body"],
		isString: {
			errorMessage: "Description must be string!",
		},
	},
	brand: {
		in: ["body"],
		isString: {
			errorMessage: "Brand must be string!",
		},
	},
	price: {
		in: ["body"],
		isString: {
			errorMessage: "Price  must be a string",
		},
	},
	category: {
		in: ["body"],
		isString: {
			errorMessage: "Category  must be a string",
		},
	},
};

export const validateUploadImage = (req, res, next) => {
	if (!req.file) {
		next(createError(400, "Image must be sent"));
	} else {
		const allowedExtensions = ["png", "jpg", "jpeg"];
		const [fileName, ext] = req.file.originalname.split(".");
		if (!allowedExtensions.includes(ext)) {
			next(createError(400, "Image must be image"));
		} else {
			next();
		}
	}
};
export const checkProductSchema = checkSchema(productSchema);

export const validateProductSchema = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		next(createError(400, "Validation error", errors));
	}
	next();
};
