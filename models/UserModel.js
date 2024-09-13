import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
    {
        email: {type: String, unique: true},
        firstname: String,
        lastname: String,
        password: {type: String, unique: true}
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const Users = mongoose.model('users','UserSchema');

export default Users;