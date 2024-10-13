import dotenv from 'dotenv';
dotenv.config();

// PORT
export const PORT =  process.env.PORT;

// MongoDB Connection String
export const DB_URL = process.env.DB_URL;

// JWT Configuration
export const JWT_KEY = process.env.JWT_KEY;
export const JWT_EXPIRE_TIME = process.env.JWT_EXPIRE_TIME;

// Email Provider Configuration
export const EMAIL_UNAUTHORIZED = false;
export const EMAIL_USER = process.env.EMAIL_USER;
export const EMAIL_PASS = process.env.EMAIL_PASS;
export const EMAIL_SECURITY = process.env.EMAIL_SECURITY;

export const WEB_CACHE = false;
export const MAX_JSON_SIZE = "10MB";
export const URL_ENCODED = true;

export const REQUEST_TIME = 20*60*1000;
export const REQUEST_NUMBER = 2000;
