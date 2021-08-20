import { Router } from 'express';
import mediaServices from './media/route.js';
// import reviewsServices from './reviews/route.js';

const services = new Router();

services.use('/media', mediaServices)
// services.use('/reviews' , reviewsServices )

export default services;


