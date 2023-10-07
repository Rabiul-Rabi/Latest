import mongoose from "mongoose";

const  card = mongoose.Schema({
    email: String,
    id:String,
    name: String,
    description: String,
    category: String,
    price: String,
    brand: String,
    discount:String,
    imageUrl: String,
})
export default card;