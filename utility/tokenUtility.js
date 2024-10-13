import { JWT_EXPIRE_TIME, JWT_KEY } from "../configs/config.js";
import jwt from "jsonwebtoken";


export const EncodeToken = (email, user_id)=> {
    const EXPIRATION = {expiresIn: JWT_EXPIRE_TIME};
    const PAYLOAD = {email, user_id};
    return jwt.sign(PAYLOAD, JWT_KEY, EXPIRATION);
}

export const DecodeToken = (token)=> {
    try {
        return jwt.verify(token, JWT_KEY);
    }
    catch(e){
        return null;
    }
}