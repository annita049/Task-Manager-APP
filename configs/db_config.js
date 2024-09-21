import mongoose from "mongoose";
import {DB_URL} from "./config.js"

const DB_connection = ()=> {
    
    mongoose.connect(DB_URL, {autoIndex: true})
    .then(()=>{
        console.log("DataBase Connection Established");
    })
    .catch((err)=>{
        console.log("DataBase Connection Failed!");
    });
}

export default DB_connection;