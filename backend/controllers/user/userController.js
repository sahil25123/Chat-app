import User from "../../models/user.js";
import Conversation from "../../models/conversation.js";
import Message from "../../models/message.js";

export const getUserforSidebar = async(req,res)=>{
    try{
        const loggedInUserId = req.user._id;

        // Get all users except the logged-in user
        const filteredUsers = await User.find({_id :{$ne: loggedInUserId}}).select("-password");

        // Get conversations for each user
        const usersWithLastMessage = await Promise.all(filteredUsers.map(async (user) => {
            const conversation = await Conversation.findOne({
                participants: { $all: [loggedInUserId, user._id] }
            }).populate({
                path: 'message',
                options: { sort: { createdAt: -1 }, limit: 1 },
                populate: {
                    path: 'senderId',
                    select: 'fullName'
                }
            });

            const lastMessage = conversation?.message[0] || null;
            
            return {
                ...user.toObject(),
                lastMessage: lastMessage ? {
                    text: lastMessage.message,
                    sender: lastMessage.senderId.fullName,
                    timestamp: lastMessage.createdAt
                } : null
            };
        }));

        res.status(200).json(usersWithLastMessage);
    }
    catch(error){
        console.log("Error in the User Controller",error);
        res.status(400).json({Error:"Internal Server Error"}) 
    }
}