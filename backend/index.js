const express = require("express");

const app = express();

const port = 8001;

app.listen("/",()=>{
    console.log("Server is running on port")
})