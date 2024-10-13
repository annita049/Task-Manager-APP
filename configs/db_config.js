import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const DB_connection = ()=> {
    
    mongoose.connect(process.env.DB_URL, {autoIndex: true})
    .then(()=>{
        console.log("DataBase Connection Established");
    })
    .catch((err)=>{
        console.log("DataBase Connection Failed!");
    });
}

export default DB_connection;