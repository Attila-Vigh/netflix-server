import { Router } from "express";
import mediaHandlers from "./handlers.js";
// import {
//     validateUploadImage,
//     checkMediaSchema,
//     validateMediaSchema,
//     } from "./validations.js";
import multer from "multer";

const upload = multer();

const route = Router();

route.post  ( 
    "/",
    // checkMediaSchema,
    // validateMediaSchema, 
    mediaHandlers.create 
);

route.get   ( "/"    , mediaHandlers.list   );

// route.get   ( "/:id" , mediaHandlers.single );

route.get   ( "/:id", mediaHandlers.mediaWithReviews );

route.put   ( "/:id" , mediaHandlers.update );

route.put   ( 
    "/:id/poster" ,
    upload.single( "poster" ), 
    // validateUploadImage,
    mediaHandlers.posterUpload 
);

route.post("/:id/reviews", mediaHandlers.addReview);

route.delete("/:id/reviews/:id", mediaHandlers.deleteReview);

route.delete( "/:id" , mediaHandlers.delete );

route.get("/:id/pdf", mediaHandlers.downloadPdf);

export default route;
