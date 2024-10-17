import mongoose from "mongoose";

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: String,
    password: String,
    isVerified: Boolean
})

const User = mongoose.model("User", userSchema);

export default User;