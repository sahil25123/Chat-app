import mongoose, { Schema } from "mongoose";

const msgSchema = new mongoose.Schema ({
    Sender_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true,

    },
    Recevier_Id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    message:{
        type:String,
        required:true
    }
},{timestamps:true});

const Message = mongoose.model("Message",msgSchema)

export default Message;
