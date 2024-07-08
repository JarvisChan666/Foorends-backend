import express from "express";
import MyUserController from "../controllers/MyUserController";

const router = express.Router();

// /api/my/user Business Logic handled by this function
// If it is a post request
router.post("/", MyUserController.createCurrentUser);

export default router;