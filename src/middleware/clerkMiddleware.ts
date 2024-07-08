import { Request, Response, NextFunction } from "express";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import User from "../models/user";

const clerkAuth = ClerkExpressWithAuth();

export const clerkMiddleware = [
  clerkAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { clerkId } = req.body;
      if (!clerkId) {
        return res.sendStatus(401);
      }

      next();
    } catch (error) {
      console.error("Error in Clerk middleware:", error);
      return res.sendStatus(401);
    }
  },
];
