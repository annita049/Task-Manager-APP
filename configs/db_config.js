import mongoose from "mongoose";

const DB_URL = "mongodb+srv://annita01:YJVyFga8KJXSkobC@mern.bcxyy.mongodb.net/TaskManager";

const DB_connection = ()=> {
    /**
     * Connects to the MongoDB database using the provided DB_URL.
     * This function is exported and intended to be used to establish the database connection.
     */
    mongoose.connect(DB_URL, {autoIndex: true})
    .then(()=>{
        console.log("DataBase Connection Established");
    })
    .catch((err)=>{
        console.log("DataBase Connection Failed!");
    });
}

export default DB_connection;