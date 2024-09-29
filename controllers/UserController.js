import UserModel from "../models/UserModel.js"
import { EncodeToken } from "../utility/tokenUtility.js";

export const Registration = async (req, res) => {
    try {
        const user = req.body;
        await UserModel.create(user);
        return res.json({status: "success", message: "User registered successfully!"});
    }
    catch(err){
        return res.json({status: "fail", message: err.toString()});
    }
}

export const Login = async (req, res)=> {
    try {
        const user = req.body;
        const data = await UserModel.findOne(user);
        console.log(data);
        if(data){
            // Login Successful 
            // JWT token encode-decode
            let token = EncodeToken(data.email, data._id);
            console.log(token);
            return res.json({status: "success", message: "User found!", data: {token}});
        }
        else
            return res.json({status: "fail", message: "Couldn't find user!"});      
    }
    catch(err){
        return res.json({status: "fail", message: err.message});
    }
}

export const ProfileDetails = async (req, res)=> {
    return res.json({status: "success"});
}

export const UpdateProfile = async (req, res)=> {
    return res.json({status: "success"});
}

export const VerifyEmail = async (req, res)=> {
    return res.json({status: "success"});
}

export const VerifyCode = async (req, res)=> {
    return res.json({status: "success"});
}

export const ResetPassword = async (req, res)=> {
    return res.json({status: "success"});
}