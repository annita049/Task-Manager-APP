import express from "express"
import cors from "cors";
import ratelimit, { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import cookieParser from "cookie-parser";
// import mongoose from "mongoose";

import router from "./routes/api.js";
import {MAX_JSON_SIZE, REQUEST_NUMBER, REQUEST_TIME, URL_ENCODED, WEB_CACHE, PORT} from "./configs/config.js"

import DB_Connection from "./configs/db_config.js";

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// default middlewares
app.use(cookieParser());
// app.use(cors({
//     origin: `http://localhost:${PORT}`, 
//     credentials: true,
// }));
app.use(helmet());
// app.use(express.json());
app.use(express.json({limit: MAX_JSON_SIZE}));
app.use(express.urlencoded({extended: true})); //set to true
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    if (req.url.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
    }
    if (req.url.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
    }
    next();
});

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

app.use('', router);

// app.use('/api', router);

// Rate Limiter
// const limiter = rateLimit({windowMs: REQUEST_TIME, max: REQUEST_NUMBER});
// app.use(limiter);

// Cache
// app.set('etag',WEB_CACHE);

// DB connection
DB_Connection();


app.listen(PORT, ()=>{
    console.log(`Server Started on ${PORT}`);
})