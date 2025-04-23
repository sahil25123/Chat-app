import User from "../../models/user.js";

export const getUserforSidebar = async(req,res)=>{
    try{

        const loggedInUserId = req.user._id;

        const filteredUsers = await User.find({_id :{$ne: loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers);


    }
    catch(error){
        console.log("Error in the User Controller",error);
        res.status(400).json({Error:"Internal Server Error"}) 


    }

}