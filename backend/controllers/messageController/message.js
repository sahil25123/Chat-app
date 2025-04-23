import { json } from "express";
import conversation from "../../models/conversation.js";
import message from "../../models/message.js";

const mesgController = async (req, res) => {
    try {
        const { message: messageContent } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
        // console.log(senderId);

        let Conversation = await conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!Conversation) {
            Conversation = await conversation.create({
                participants: [senderId, receiverId],
                messages: []
            });
        }

        const newMsg = new message({
            senderId,
            receiverId,       
            message: messageContent
        });

        await newMsg.save();

        if (newMsg) {
            Conversation.message.push(newMsg._id);
            await Conversation.save();
        }

        res.status(201).json({ newMsg });
    } catch (error) {
        console.log("Error in the send message Controller", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default  mesgController;


export const getMessages = async(req,res)=>{
    try {
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;
        // console.log(senderId);

        const existingConversation = await conversation.findOne({
            participants: {$all: [senderId, userToChatId]},
        }).populate("messages");

        if(!existingConversation) {
            return res.status(404).json({message: "No conversation found"});
        }

        res.status(200).json(existingConversation.messages);
    }
    catch(error) {
        console.log("Error occurred in the getMessage", error);
        res.status(500).json({error: "Internal Server Error"});
    }
}


