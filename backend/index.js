import express from "express";
import dotenv from "dotenv";


import authRoutes from "./Routes/authRoutes.js"

dotenv.config();
const app = express();



const port = process.env.PORT || 8001;
app.get("/",(req,res)=>{
    res.send("Server is running ")
})


app.use("/api/auth",authRoutes);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})