import { JWT_EXPIRE_TIME, JWT_KEY } from "../configs/config.js";
import jwt from "jsonwebtoken";


export const EncodeToken = (email, user_id)=> {
    const KEY = JWT_KEY;
    const EXPIRATION = {expiresIn: JWT_EXPIRE_TIME};
    const PAYLOAD = {email: email, user_id: user_id};

    return jwt.sign(PAYLOAD, KEY, EXPIRATION);
}

export const DecodeToken = async (req, res)=> {
    
}