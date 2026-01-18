import express from "express";
import { signup,login,logout,updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetprotection } from "../middleware/arcjet.middleware.js";


const router = express.Router();

router.post("/signup",arcjetprotection,signup);

router.post("/login",arcjetprotection, login);

router.post("/logout"arcjetprotection,logout);

router.put("/update-profile",arcjetprotection,protectRoute,updateProfile);

router.get("/check",arcjetprotection,protectRoute,(req,res)=> res.status(200).json(req.user));


export default router;