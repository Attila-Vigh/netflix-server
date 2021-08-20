import media from '../../utils/fs-utils.js';
import { join } from 'path';

import reviews from '../../utils/fs-utils.js';

const reviewsJSONFilePath  = join( process.cwd(), 'src/data/reviews.json' );


const mediaJSONFilePath = join( process.cwd(), 'src/data/media.json' );

export const listMedia = async (req, res, next) => {
	try {
		const mediaList = await media.read( mediaJSONFilePath );

		const reviewsList = await reviews.read(reviewsJSONFilePath);

		const mediaListWithReviews = mediaList.map( (mediaItem) => {
			return {
				...mediaItem,
				reviews: reviewsList.filter((review) => review.elementId === mediaItem.imdbID )
			};
		} );
		
		
		if (req.query && req.query.Title){
			const filteredMedia = mediaList.filter((media) =>
				media.Title
					.toLocaleLowerCase()
					.includes(req.query.Title.toLocaleLowerCase())
			)
			return res.json(filteredMedia);
		} 
	
		res.send(mediaListWithReviews);
	} 
	catch (error) {
		res.status(500).send({ error: error.message });
	}
}
export const XXXXXXXXXXsingleMedia = async (req, res, next) => {
	try {
		const mediaSingle = await media.findById( req.params.id, mediaJSONFilePath );
		
		res.send(mediaSingle);
	} 
	catch (error) {
		res.status(500).send({ error: error.message });
	}
}

export const singleMediaWithReviews = async (req, res, next) => {
	try {

		console.log(req.params.id);
		const singleMedia = await media.findById(req.params.id, mediaJSONFilePath);
		console.log(singleMedia);
		
		const reviewsList = await reviews.read( reviewsJSONFilePath );

		const mediaReviews = reviewsList.filter((review) => review.elementId === singleMedia.imdbID );
		res.send({ singleMedia, mediaReviews });
	} 
	catch (error) {
		res.status(500).send({ error: error.message });
	}
}

export const createMedia = async (req, res, next) => {
	try {
		// delete req.body.imageUrl;
		const newMedia = await media.new( req.body, mediaJSONFilePath );
		res.status(201).send(newMedia );
	} 
	catch (error) {
		res.status(500).send({ error: error.message });
	}
}

export const updateMedia = async (req, res, next) => {
	try {
		const updatedMedia = await media.update( req.params.id, req.body, mediaJSONFilePath );
		res.status(201).send(updatedMedia );
	} 
	catch (error) {
		res.status(500).send({ error: error.message });
	}
}

export const uploadMediaImage = async (req, res, next) => {
	try {

		console.log( req.body );
		console.log( req.file );
		const updatedImage = await media.updateImage( req.params.id, req.file, mediaJSONFilePath );

		res.status(201).send( updatedImage );
	} 
	catch (error) {
		res.status(500).send({ error: error.message });
	}
}

export const deleteMedia = async (req, res, next) => {
	try	{
		await media.delete(req.params.id, mediaJSONFilePath);
		res.status(204).send();
	}
	catch (error)
	{
		res.status(500).send({ error: error.message });
	}
}

export const createReview = async (req, res, next) => {
	try
	{
		const newMedia = await media.new(req.body, reviewsJSONFilePath);
		res.status(201).send(newMedia);
	}
	catch (error)
	{
		res.status(500).send({ error: error.message });
	}
}

export const deleteReview = async (req, res, next) => {
	try	{

		console.log("req.params", req.params);
		console.log("req.body", req.body);
		await media.delete(req.params.id, reviewsJSONFilePath);
		res.status(204).send();
	}
	catch (error)
	{
		res.status(500).send({ error: error.message });
	}
}
export const downloadMediaPdf = async (req, res, next) => {
	try	{

		console.log("req.params", req.params);
		console.log("req.body", req.body);
		await media.delete(req.params.id, reviewsJSONFilePath);
		res.status(204).send();
	}
	catch (error)
	{
		res.status(500).send({ error: error.message });
	}
}


const mediaHandlers = {
	create: createMedia,
	list : listMedia,
	// single: XXXXXXXXXXsingleMedia,
	mediaWithReviews: singleMediaWithReviews,
	update: updateMedia,
	posterUpload: uploadMediaImage,
	addReview: createReview,
	deleteReview: deleteReview,
	delete: deleteMedia,
	downloadPdf: downloadMediaPdf
}

export default mediaHandlers 

