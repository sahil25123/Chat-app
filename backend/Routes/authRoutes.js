import express from "express";
import { loginController } from "../controllers/authController/login.js";
import { signupController, signupForm } from "../controllers/authController/signup.js";

const router = express.Router();

router.get("/login",loginController);

router.get("/signup" , signupForm);

router.post("/signup" ,signupController );

export default router;
