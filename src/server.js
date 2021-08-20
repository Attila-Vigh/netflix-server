import express from 'express';
import cors from 'cors';
import listEndpoints from 'express-list-endpoints';
import services from './services/index.js';
import { notFoundErrorHandler, badRequestErrorHandler, serverErrorHandler } from './middleWares/errorHandlers.js'
import { publicPath } from "./utils/fs-utils.js";

const PORT = process.env.PORT;     // Port to run the server on

const app = express();             // Create an express app    

// const whiteList = [ process.env.PORT ];
const corsOptions = {
    origin: (origin, next) => {
        if (!origin || whitelist.indexOf(origin) !== -1)
        {
            next(null, true);
        }
        else
        {
            const error = new Error("Not allowed by cors!");
            error.status = 403;
            next(error);
        }
    },
};

app.use(cors(corsOptions));         //! TODO:           // to enable cross origin resource sharing ( to be able to serve the api from a different domain )

app.use("/images", express.static(publicPath));         // place to put images

app.use(express.json());                                // handle requests containing a json payload

app.use('/', services);                                 // handle requests TO the root path

console.table(listEndpoints(app));

app.use(notFoundErrorHandler);                           // handle 404
app.use(badRequestErrorHandler);                         // handle 400
app.use(serverErrorHandler)                              // handle 500

app.listen(PORT, () => console.log(`Server running at http://localhost:${ PORT }`));
app.on('error', (err) => console.log(`Server crushed: ${ err }`));