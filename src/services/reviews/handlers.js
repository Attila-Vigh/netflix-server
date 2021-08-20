import reviews from '../../utils/fs-utils.js';
import { join } from 'path';

const reviewsJSONFilePath = join( process.cwd(), 'src/data/reviews.json' );

export const listReviews = async (req, res, next) => {
	try {
		const reviewsList = await reviews.read( reviewsJSONFilePath );
		res.send(reviewsList);
	} 
	catch (error) {
		res.status(500).send({ error: error.message });
	}
}
export const singleReview = async (req, res, next) => {
	try {
		const reviewsList = await reviews.findById( req.params.id, reviewsJSONFilePath );
		res.send(reviewsList);
	} 
	catch (error) {
		res.status(500).send({ error: error.message });
	}
}

export const createReview = async (req, res, next) => {
	try {
		// delete req.body.imageUrl;
		const newReviews = await reviews.new( req.body, reviewsJSONFilePath );
		res.status(201).send( newReviews );
	} 
	catch (error) {
		res.status(500).send({ error: error.message });
	}
}

export const updateReview = async (req, res, next) => {
	try {
		const updatedReviews = await reviews.update( req.params.id, req.body, reviewsJSONFilePath );
		res.status(201).send( updatedReviews );
	} 
	catch (error) {
		res.status(500).send({ error: error.message });
	}
}

export const deleteReview = async (req, res, next) => {
	try	{
		await reviews.delete(req.params.id, reviewsJSONFilePath);
		res.status(204).send({ message: 'Review deleted' + req.params.id } );
	}
	catch (error)
	{
		res.status(500).send({ error: error.message });
	}
}


const reviewsHandlers = {
	list : listReviews,
	create: createReview,
	update: updateReview,
	single: singleReview,
	delete: deleteReview,
}

export default reviewsHandlers 

