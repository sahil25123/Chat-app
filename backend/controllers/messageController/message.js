const mesgController = async (req, res)=>{
    console.log("message controller")
    res.status(200).json({message:"message sent or recived"})
}

export default mesgController;
