import { DecodeToken } from "../utility/tokenUtility.js";

export default (req, res, next) => {

    let token = req.headers.token;
    let decoded_token = DecodeToken(token);

    if(!decoded_token){
        res.status(401).json({status: "Unauthorized"});
    }
    else {
        console.log(decoded_token.user_id);
        req.headers.email = decoded_token.email;
        req.headers.user_id = decoded_token.user_id;
        next();
    }
}