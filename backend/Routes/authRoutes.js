import express from "express";
import { loginController } from "../controllers/authController/login.js";
import { signupController } from "../controllers/authController/signup.js";

const router = express.Router();

router.get("/login",loginController);

router.get("/signup" , signupController);

export default router;
