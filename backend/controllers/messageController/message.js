import { json } from "express";
import Conversation from "../../models/conversation.js";
import Message from "../../models/message.js";
import { getReceiverSocketId, io } from "../../socket/socket.js"

const mesgController = async (req, res) => {
    try {
        const { message: messageContent } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        if (!messageContent || !receiverId || !senderId) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
                message: []
            });
        }

        const newMsg = new Message({
            senderId,
            receiverId,       
            message: messageContent
        });

        await newMsg.save();

        if (newMsg) {
            conversation.message.push(newMsg._id);
            await conversation.save();
        }

        // Populate the sender and receiver details
        const populatedMsg = await Message.findById(newMsg._id)
            .populate('senderId', 'fullName ProfilePic')
            .populate('receiverId', 'fullName ProfilePic');

        // Get socket IDs for both sender and receiver
        const receiverSocketId = getReceiverSocketId(receiverId);
        const senderSocketId = getReceiverSocketId(senderId);

        // Emit to both sender and receiver if they are online
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", populatedMsg);
        }
        if (senderSocketId) {
            io.to(senderSocketId).emit("newMessage", populatedMsg);
        }

        res.status(201).json({ newMsg: populatedMsg });
    } catch (error) {
        console.log("Error in the send message Controller", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default mesgController;

export const getMessages = async(req,res)=>{
    try {
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;

        if (!userToChatId || !senderId) {
            return res.status(400).json({ error: "Missing required parameters" });
        }

        const existingConversation = await Conversation.findOne({
            participants: {$all: [senderId, userToChatId]},
        }).populate({
            path: 'message',
            populate: {
                path: 'senderId receiverId',
                select: 'fullName ProfilePic'
            },
            options: { sort: { createdAt: 1 } }
        });

        if(!existingConversation) {
            return res.status(200).json([]);
        }

        if (!existingConversation.message || existingConversation.message.length === 0) {
            return res.status(200).json({ messages: [] });
        }

        res.status(200).json(existingConversation.message);
    }
    catch(error) {
        console.log("Error occurred in the getMessage", error);
        res.status(500).json({error: "Internal Server Error"});
    }
}


