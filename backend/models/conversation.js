import mongoose from "mongoose";
import User from "./user";

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