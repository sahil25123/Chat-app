import express from "express";
import mesgController, { getMessages } from "../controllers/messageController/message.js";
import protectRoute from "../middleware/ProtectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, mesgController);

export default router;
