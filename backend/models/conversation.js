import mongoose from "mongoose";
import User from "./user.js";

const converSchema = new mongoose.Schema({
    participants:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ], 
    message :[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message",
            default:[]
        },
        
    ]

},{timestamps:true})

const conversation = mongoose.model("conversation" , converSchema)
export default conversation;

