import bcrypt from 'bcrypt'
import UserModel from "../models/UserModel.js"
import SendEmail from "../utility/emailUtility.js";
import { EncodeToken } from "../utility/tokenUtility.js";

export const Registration = async (req, res) => {
    try {
        let {email, firstname, lastname, password} = req.body;
        let user = await UserModel.findOne({email});
        if(user){
            return res.status(400).json({status: "success", message: "User already exists!"});
        }

        // Hashing of plain password --> bcrypt
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(hashedPassword);

        user = new UserModel({
            email,
            firstname,
            lastname,
            password: hashedPassword
        });

        await user.save();
        return res.status(200).json({status: "success", message: "User registered successfully!"});
    }
    catch(err){
        res.status(500).json({status: "fail", message: err.toString()});
    }
}

export const Login = async (req, res)=> {
    try {
        const user = await UserModel.findOne({email: req.body.email});
        console.log(user);

        if(!user){
            return res.status(400).json({status:"fail", message: "User not found!" });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch){
            // Login Successful 
            // JWT token encode-decode
            return res.status(400).json({status:"fail", message: 'Wrong password'});
        }
        let token = EncodeToken(user.email, user._id);
        // console.log(token);
        return res.status(200).json({status: "success", message: "User found!", data: {token}});
    }
    catch(err){
        res.status(500).json({status: "fail", message: err.toString()});
    }
}


export const ProfileDetails = async (req, res)=> {

    try {
        let user = await UserModel.findOne({_id: req.user.user_id}).select(['firstname', 'lastname', 'email']);

        if (!user) return res.status(404).send('User not found');
        res.status(200).json({status: "success", user});
    }
    catch(e){
        res.status(500).json({status: "success", user});
    }
}

export const UpdateProfile = async (req, res)=> {
    try{
        let user_id = req.user.user_id;
        let data = req.body;
        await UserModel.updateOne({_id: user_id}, data);
        return res.json({status: "successfully updated data"});
    }
    catch(e){
        res.json(e.toString());
    }
}

export const VerifyEmail = async (req, res)=> {
    try {
        let email = req.params.email;
        let user = await UserModel.findOne({email: email});
    
        if (!user) {
            res.json({status: "fail", message: "User Does not exist!"});
        }
        else {

            // Send verifitcation OTP in User Email
            let EmailTo = user.email;
            let EmailSubject = "Task Manager App User Email Verification Code";
            let otp = Math.floor(100000 + Math.random() * 900000);
            let EmailText = "Your Verification OTP is " + otp;

            SendEmail(EmailTo, EmailSubject, EmailText);

            // Update User OTP
            await UserModel.updateOne({email: email}, {otp})
            res.json({status: "success", message: "OTP sent to user Email"});
        }
    }
    catch(e){
        res.json({status: "fail", message: e.toString()});
    }
}


export const VerifyCode = async (req, res)=> {
    try {
        let user = await UserModel.findOne({email: req.body.email, otp: req.body.otp});
        // console.log("NPNP", user);
        if(!user){
            return res.json({status: "fail", message: "Wrong Verification Code"});
        }
        res.json({status: "success", message: "Verification Successful"});

    }
    catch(e){
        res.json({status: "fail", message: e.toString()});
    }
}

export const ResetPassword = async (req, res)=> {
    try {
        let user = await UserModel.findOne({email: req.body.email, otp: req.body.otp});
        // console.log("NPNP", user);
        if(!user){
            res.json({status: "fail", message: "Wrong Verification Code"});
        }
        else {
            await UserModel.updateOne(
                {email: req.body.email},
                {
                    otp: "0",
                    password: req.body.password
                }
            )
            res.json({status: "success", message: "Password Reset Successful"});
        }
    }
    catch(e){
        res.json({status: "fail", message: e.toString()});
    }
}

