import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: String,
  password:String
});

const User = mongoose.model("user", userSchema,"user");
export default  User;