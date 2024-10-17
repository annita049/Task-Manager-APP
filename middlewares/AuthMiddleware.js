import { DecodeToken } from "../utility/tokenUtility.js";

export default (req, res, next) => {

    const token = req.cookies.Token;
    // console.log('cookie token', token);

    if(!token){
        // res.status(401).json({status: 'fail', message: 'Access Denied!'});
        // res.redirect('/home');
        // res.render(guest_home);
        res.redirect('/home');
        // return next();
    }
    else {
        try {
            let decoded = DecodeToken(token);
            req.user = decoded;
            next();
        }
        catch(e){
            return res.redirect('/login');
            // res.status(401).json({status: 'fail', message: "Invalid Token. Token Expired."});
        }
    }
}