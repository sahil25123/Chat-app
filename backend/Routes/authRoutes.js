import express from "express";
import { loginController, loginForm } from "../controllers/authController/login.js";
import { signupController, signupForm } from "../controllers/authController/signup.js";
import logOutController from "../controllers/authController/logout.js";

const router = express.Router();

router.get("/login",loginForm);
router.post("/login",loginController);

router.get("/signup" , signupForm);
router.post("/signup" ,signupController );

router.post("/logout",logOutController);

export default router;
