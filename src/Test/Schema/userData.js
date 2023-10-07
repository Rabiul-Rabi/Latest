import mongoose from "mongoose";

const  userData = mongoose.Schema({
    name: String,
    email: String,
    password: String
})
export default userData;