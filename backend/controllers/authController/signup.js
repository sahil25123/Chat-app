import User from "../../models/user.js";
import bcrypt from "bcrypt";

export const signupForm = (req,res) =>{
    res.send("Sign up Routes")
}

export const signupController = async (req,res)=>{
    try {
        const {fullName,Username, password , confirmPassword , gender}= req.body;

        if(password !== confirmPassword){
            return res.status(400).json({error:"both password are not same"})
        }

        const user=  await User.findOne({Username})
        if(user){
            return res.status(400).json({error:"username already exists"})
        }

        //Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        const boyProfile = `https://avatar.iran.liara.run/public/boy?username=${Username}`;

        const girlProfile = `https://avatar.iran.liara.run/public/girl?username=${Username}`;


        const newUser = new User({
            fullName,
            Username,
            password:hashedPassword, 
            gender, 
            ProfilePic: gender === "male" ? boyProfile : girlProfile
        });
        
        await newUser.save();

        res.status(201).json({
            _id :newUser._id,
            fullName :newUser.fullName,
            Username:newUser.Username,
            ProfilePic:newUser.ProfilePic

        })
    }   


    

    catch(error){
        console.log("error in the sign up controller", error.message)
        res.status(500).json({Error:"Internal Server Error"}
        )

    }
    


}