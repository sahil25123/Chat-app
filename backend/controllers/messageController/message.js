import conversation from "../../models/conversation.js";
import message from "../../models/message.js";

const mesgController = async (req, res)=>{
    try{
        const {message: messageContent} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        let Conversation = await conversation.findOne({
            participants: {$all: [senderId, receiverId]}
        });

        if(!Conversation){
            Conversation = await conversation.create({
                participants: [senderId, receiverId],
                messages: []
            });
        }

        const newMsg = new message({
            senderId: senderId,
            receiverId: receiverId,
            message: messageContent
        });

        await newMsg.save();
        
        if(newMsg){
            Conversation.messages.push(newMsg._id);
            await Conversation.save();
        }
        
        res.status(201).json({message: "New message received"});
    }
    catch(error){
        console.log("Error in the send message Controller", error);
        res.status(500).json({error: "Internal server error"});
    }
}

export default mesgController;
