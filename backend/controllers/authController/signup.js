import User from "../../models/user.js";

export const signupForm = (req,res) =>{
    res.send("Sign up Routes")
}

export const signupController = async (req,res)=>{
    try {
        const {fullname,username, password , confirmPassword , gender}= req.body;

        if(password !== confirmPassword){
            console.log("The password doesnt match try again");
        }

        const user=  await User.findOne({Username})
        if(user){
            console.log("User already exist");
        }
    }   
    

    catch(error){

    }
    


}