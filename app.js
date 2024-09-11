import express from "express"
import cors from "cors";
import ratelimit, { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import mongoose from "mongoose";

import router from "./routes/api.js";
import {MAX_JSON_SIZE, REQUEST_NUMBER, REQUEST_TIME, URL_ENCODED, WEB_CACHE} from "./configs/config.js"


const app = express();
const port = process.env.PORT || 3000;


// default middlewares
app.use(cors());
app.use(helmet());
app.use(express.json({limit: MAX_JSON_SIZE}));
app.use(express.urlencoded({extended: URL_ENCODED}));

// Rate Limiter
const limiter = rateLimit({windowMs: REQUEST_TIME, max: REQUEST_NUMBER});
app.use(limiter);

// Cache
app.set('etag',WEB_CACHE);