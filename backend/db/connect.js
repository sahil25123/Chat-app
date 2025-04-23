import mongoose from "mongoose";

const connectToMongoDB= async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URL)
        console.log("Connected to MongoDB")

    }
    catch(error){
        console.log("Failed to Connect got an Error")
        console.log(error);

    }
}

export default connectToMongoDB;
