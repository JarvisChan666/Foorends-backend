import express from "express";
import MyUserController from "../controllers/MyUserController";
import { clerkMiddleware } from "../middleware/clerkMiddleware";

const router = express.Router();

// /api/my/user Business Logic handled by this function
// If it is a post request
router.post("/", clerkMiddleware, MyUserController.createCurrentUser);

export default router;
