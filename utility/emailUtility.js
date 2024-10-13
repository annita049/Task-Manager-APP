import nodemailer from "nodemailer"
import dotenv from 'dotenv';
dotenv.config();  // to load environment variables from .env file

import { EMAIL_HOST, EMAIL_PORT, EMAIL_SECURITY } from "../configs/config.js"

const SendEmail = async(EmailTo, EmailSubject, EmailText)=> {

    let transporter = nodemailer.createTransport({
        // host: EMAIL_HOST,
        // port: EMAIL_PORT,
        // secure: EMAIL_SECURITY,
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let mailOptions = {
        from: "Task Manager APP <e.annita2001@gmail.com>",
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText
    }
    return await transporter.sendMail(mailOptions);
}

export default SendEmail;