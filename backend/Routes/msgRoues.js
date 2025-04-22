import express from "express";
import mesgController from "../controllers/messageController/message.js";


const router  = express.Router();

router.post("/send/:id",mesgController);

export default router;
