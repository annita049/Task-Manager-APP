import bcrypt from 'bcrypt'
import crypto from 'crypto'
import UserModel from "../models/UserModel.js"
import SendEmail from "../utility/emailUtility.js";
import { EncodeToken } from "../utility/tokenUtility.js";

const generateOTP = ()=> {
    return crypto.randomInt(100000, 999999);  // 6-digit OTP in string
}

export const SendOTP = async(user)=>{
    const otp = generateOTP();
    const otpExpiration = new Date(Date.now() + 10*60*1000);

    // saving otp to database
    user.otp = otp;
    user.otpExpiration = otpExpiration;
    await user.save();

    const EmailTo = user.email;
    const EmailSubject = "Task Manager App Email Verification";
    const EmailContent = `Your OTP for email verification is ${otp}`;
    await SendEmail(EmailTo, EmailSubject, EmailContent);
}

export const Registration = async (req, res) => {
    try {
        let {email, firstname, lastname, password} = req.body;
        let user = await UserModel.findOne({email});
        if(user){
            return res.status(400).json({status: "fail", message: "User already exists!"});
        }
        // const otp = generateOTP();
        // console.log("my otp---->", otp);

        user = new UserModel({
            email,
            firstname,
            lastname,
            password,
        });
        
        await user.save();

        await SendOTP(user);

        return res.status(201).json({status: "success", message: "User registered successfully! OTP sent to email for verification."});
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

        // if (!user.isVerified) {
        //     return res.status(401).json({status: "fail", message: 'Email not verified. Please verify your email first' });
        // }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch){
            return res.status(400).json({status:"fail", message: 'Wrong password'});
        }
        let token = EncodeToken(user.email, user._id);
        // console.log(token);
        res.status(200).json({status: "success", message: "Login Successful, user found!", user, token});
    }
    catch(err){
        res.status(500).json({status: "fail", message: err.toString()});
    }
}

export const ProfileDetails = async (req, res)=> {

    try {
        const user_id = req.user.user_id;
        let user = await UserModel.findById(user_id).select(['firstname', 'lastname', 'email']);

        if (!user)
            return res.status(404).json({status: "fail", message: "User Not found!"});

        res.status(200).json({status: "success", message: "User found!",user});
    }
    catch(e){
        res.status(500).json({status: "fail", message: e.toString()});
    }
}

export const UpdateProfile = async (req, res)=> {
    try{
        const user_id = req.user.user_id;
        const data = req.body;
        const user = await UserModel.findById(user_id);

        if (!user) 
            return res.status(404).json({status: "fail", message: "User Not found!"});

        // data is client provided info
        // user is header attached by auth middleware
        user.firstname = data.firstname || user.firstname;
        user.lastname = data.lastname || user.lastname;
        user.password = data.password || user.password;

        await user.save();
        res.json({status: "success", message: "successfully updated data", user});
    }
    catch(e){
        res.status(500).json({status: "fail", message: e.toString()});
    }
}

export const VerifyEmail = async (req, res)=> {
    const {otp} = req.body; // only OTP is provided by the client

    try {
        // email is already known as the user is authenticated
        const email = req.user.email;
        const user = await UserModel.findOne({email});
        if (!user) {
            return res.status(400).json({status: 'fail', message: 'User email not found' });
        }

        // if (user.otp !== otp) {
        //     return res.status(400).json({status: 'fail', message: 'Invalid OTP'});
        // }

        // if the OTP is expired a new OTP is sent to user email
        if(user.otpExpiration < Date.now()){
            await SendOTP(user);
            return res.status(400).json({status: 'fail', message: 'OTP Expired'});
        }

        // if OTP is valid --> user is verified
        user.isEmailVerified = true;
        user.otp = null;
        user.otpExpiration = null;
        await user.save();

        res.status(200).json({status: 'success', message: 'Email verification successful' });
    }
    catch (e) {
        res.status(500).json({status: 'fail', message: e.toString()});
    }
}

export const RequestPasswordReset = async (req, res)=> {

    // email is provided by the client
    const {email} = req.body;

    try {
        const user = await UserModel.findOne({email});
        if (!user) {
            return res.status(404).json({status: "fail", message: "Email not found"});
        }

        // Send the OTP via email (use your email service)
        await SendOTP(user);

        res.status(200).json({status: "success", message: "Password reset OTP sent to your email"});
    }
    catch (err) {
        res.status(500).json({status: "success", message: e.toString()});
    }
}

