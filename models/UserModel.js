import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema(
    {
        email: {type: String, unique: true, required: true},
        firstname: {type: String, required: true},
        lastname: {type: String, required: true},
        password: {type: String, required: true},
        otp: {type: String},
        otpExpiration: {type: Date},
        isEmailVerified: {type: Boolean, default: false},
    },
    {
        timestamps: true,
        versionKey: false
    }
);

// Hashing of plain password before saving -- bcrypt

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

const Users = mongoose.model('users', UserSchema);

export default Users;