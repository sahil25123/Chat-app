import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./Routes/authRoutes.js";
import msgRoutes from "./Routes/msgRoues.js";
import userRoutes from "./Routes/userRoutes.js"
import connectToMongoDB from "./db/connect.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 8001;
app.get("/",(req,res)=>{
    res.send("Server is running ")
})


app.use("/api/auth",authRoutes);
app.use("/api/message",msgRoutes);
app.use("/api/users",userRoutes)

app.listen(port,()=>{
    connectToMongoDB();
    console.log(`Server is running on port ${port}`)
})