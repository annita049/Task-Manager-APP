import { DecodeToken } from "../utility/tokenUtility.js";

export default (req, res, next) => {
    // bearer token
    // let token = req.headers.authorization?.replace('Bearer ', '');
    // console.log("tao",token);
    // if (!token) {
    //     return res.status(401).json({ status: "fail", message: "Unauthorized: No token provided" });
    // }
    // let decoded = DecodeToken(token);
    // if (!decoded) {
    //     return res.status(401).json({ status: "fail", message: "Unauthorized: Invalid token" });
    // }
    // req.user = { 
    //     email: decoded.email, 
    //     user_id: decoded.user_id 
    // };
    // next();

    // token in cookies -------------------

    const token = req.cookies.Token;
    // console.log('cookie token', token);

    if(!token){
        res.status(401).json({status: 'fail', message: 'Access Denied!'});
    }

    try {
        let decoded = DecodeToken(token);
        req.user = decoded;
        next();
    }
    catch(e){w
        res.status(401).json({status: 'fail', message: "Invalid Token. Token Expired."});
    }
}