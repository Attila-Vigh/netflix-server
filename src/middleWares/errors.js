const errorHandlers = (error, req, res, next) => {
	console.log({ error });
	if (error) {
		res
			.status(error.status)
			.send({ 
				message: error.message, 
				errors : error.errors || [],
			});
	}
	next();
};

export default errorHandlers;
