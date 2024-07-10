import express from "express";
import MyUserController from "../controllers/MyUserController";
import { jwtCheck, jwtParse } from "../middleware/clerkMiddleware";
import { validateMyUserRequest } from "../middleware/validation";

const router = express.Router();

// /api/my/user Business Logic handled by this function
router.get("/", jwtCheck, jwtParse, MyUserController.getCurrentUser);
// If it is a post request
router.post("/", jwtCheck, MyUserController.createCurrentUser);
router.put(
  "/",
  jwtCheck,
  jwtParse,
  validateMyUserRequest,
  MyUserController.updateCurrentUser
);

export default router;
