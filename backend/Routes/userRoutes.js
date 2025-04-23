import express from "express";
import protectRoute from "../middleware/ProtectRoute.js";
import { getUserforSidebar } from "../controllers/user/userController.js";

const router = express.Router();

router.get("/",protectRoute, getUserforSidebar);


export default router;
