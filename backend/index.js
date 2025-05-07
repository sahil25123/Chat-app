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

const allowedOrigins = [
  "http://localhost:5173", // dev
  "https://chatter-box-av2e.onrender.com" // your deployed frontend
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 9000;

app.use(express.static(path.join(__dirname, "./frontend/dist")));

app.use("/api/auth",authRoutes);
app.use("/api/message",msgRoutes);
app.use("/api/users",userRoutes)



app.use((req, res) => {
  res.sendFile(path.join(__dirname, "./frontend/dist/index.html"));
});

server.listen(port,()=>{
    connectToMongoDB();
    console.log(`Server is running on port ${port}`)
})