import User from "../../models/user.js";
import genToken_setCookie from "../../utils/genToken.js";
import bcrypt from "bcrypt";


export const loginForm = (req,res)=>{
    res.send("Login router inside the controller")
}

export const loginController =  async (req, res) =>{
    try{
        const {Username , password} = req.body;

        const user = await User.findOne({Username})
        const isPasswordCorrect = await bcrypt.compare(password,user?.password || "");

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid Username or password"})
        }
        
        const token = genToken_setCookie(user._id, res);

        res.status(201).json({
            _id :user._id,
            fullName :user.fullName,
            Username:user.Username,
            ProfilePic:user.ProfilePic,
            Message:"Successfully Login",
            Welcome: user.Username,
            token:token,
        });

    }
    catch(error){
        console.log("error in the Login  controller", error)
        res.status(500).json({Error:"Internal Server Error"})
    }
}