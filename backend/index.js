import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./Routes/authRoutes.js";
import msgRoutes from "./Routes/msgRoues.js";
import userRoutes from "./Routes/userRoutes.js"
import connectToMongoDB from "./db/connect.js";


import {app , server} from "./socket/socket.js"

const __dirname = path.resolve();

dotenv.config();



// CORS configuration
app.use(cors({
    origin: "https://chatter-box-frontend-fv4n.onrender.com", // Your frontend URL
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 8001;
app.get("/",(req,res)=>{
    res.send("Server is running ")
})


app.use("/api/auth",authRoutes);
app.use("/api/message",msgRoutes);
app.use("/api/users",userRoutes)


// app.use(express.static(path.join(__dirname , "/frontend/dist")))

// app.get("*" , (req,res)=>{
//     res.sendFile(path.join(__dirname , "frontend" ,"dist" , "index.html"))
// })

server.listen(port,()=>{
    connectToMongoDB();
    console.log(`Server is running on port ${port}`)
})