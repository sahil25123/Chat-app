const  logOutController = async(req,res) =>{
    try{
        res.cookie("jwt", "" , {maxAge:0});
        res.status(200).json({Message:"Logut Succussfully"})

    }

    catch(error){
        console.log("Internal Server Error" , error)
        res.status(500).JSON({error :"Internal Sever Error"})
    }
}

export default logOutController;
