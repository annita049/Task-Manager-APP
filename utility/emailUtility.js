import nodemailer from "nodemailer"

import { EMAIL_USER, EMAIL_PASS } from "../configs/config.js";

const SendEmail = async(EmailTo, EmailSubject, EmailContent)=> {

    let transporter = nodemailer.createTransport({
        // host: process.env.EMAIL_HOST,
        // port: process.env.EMAIL_PORT,
        // secure: process.env.EMAIL_SECURITY,
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
        from: "Task Manager APP <info@teamrabbil.com>",
        to: EmailTo,
        subject: EmailSubject,
        text: EmailContent
    }
    return await transporter.sendMail(mailOptions);
}

export default SendEmail;