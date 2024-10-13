import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
    {
        email: {type: String, unique: true, required: true},
        firstname: {type: String, required: true},
        lastname: {type: String, required: true},
        password: {type: String, required: true},
        otp: {type: String, default: 0},
        isEmailVerified: {type: Boolean, default: false},
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const Users = mongoose.model('users', UserSchema);

export default Users;