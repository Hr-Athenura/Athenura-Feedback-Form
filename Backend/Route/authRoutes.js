import express from "express";
import { registerUser ,loginUser,checkAuth,logoutUser } from "../Controllers/UserControllers.js";
import {verifyToken} from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/register
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/check-auth", verifyToken, checkAuth);
router.post("/logout", logoutUser); 


export default router;
