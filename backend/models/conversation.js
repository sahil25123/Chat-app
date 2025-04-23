import mongoose from "mongoose";
import User from "./user.js";

const converSchema = new mongoose.Schema({
    participants:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true
        }
    ], 
    message :[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Message",
            required: true,
            default:[]
        }
    ]
},{timestamps:true})

const Conversation = mongoose.model("Conversation", converSchema)
export default Conversation;

