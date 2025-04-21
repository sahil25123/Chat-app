import express from "express";
import dotenv from "dotenv";
import authRoutes from "./Routes/authRoutes.js"
import connectToMongoDB from "./db/connect.js";

dotenv.config();
const app = express();

app.use(express.json());



const port = process.env.PORT || 8001;
app.get("/",(req,res)=>{
    res.send("Server is running ")
})


app.use("/api/auth",authRoutes);

app.listen(port,()=>{
    connectToMongoDB();
    console.log(`Server is running on port ${port}`)
})