import { DecodeToken } from "../utility/tokenUtility.js";

export default (req, res, next) => {

    // let token = req.headers.token;
    // let decoded_token = DecodeToken(token);

    // if(!decoded_token){
    //     res.status(401).json({status: "Unauthorized"});
    // }
    // else {
    //     console.log(decoded_token.user_id);
    //     req.headers.email = decoded_token.email;
    //     req.headers.user_id = decoded_token.user_id;
    //     next();
    // }


    let token = req.headers.authorization?.replace('Bearer ', '');

    // console.log("tao",token);
    if (!token) {
        return res.status(401).json({ status: "fail", message: "Unauthorized: No token provided" });
    }

    let decoded = DecodeToken(token);
    if (!decoded) {
        return res.status(401).json({ status: "fail", message: "Unauthorized: Invalid token" });
    }

    req.user = { 
        email: decoded.email, 
        user_id: decoded.user_id 
    };

    next();
}