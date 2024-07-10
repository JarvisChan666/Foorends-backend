import { Request, Response, NextFunction } from "express";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import User from "../models/user";
import jwt from "jsonwebtoken";

// Add custom properties to the express request
declare global {
  namespace Express {
    interface Request {
      userId: string;
      clerkId: string;
    }
  }
}

const clerkAuth = ClerkExpressWithAuth();

export const jwtCheck = [
  clerkAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.sendStatus(401); // unAuthorized
    }
    // Bearer xjocijdofji13ej013ej3
    const token = authorization.split(" ")[1]; // Get the token
    try {
      const decoded = jwt.decode(token) as jwt.JwtPayload;
      /** decode
       * {
          azp: 'http://localhost:5173',
          exp: 1720611121,
          iat: 1720611061,
          iss: 'https://charmed-bird-75.clerk.accounts.dev',
          nbf: 1720611051,
          sid: 'sess_2j3LU3W6XuSkiSkWr3M3NkPWYti',
          sub: 'user_2j3KVq4Wv5d00J8yn7IiCRLWz2X'
        }

       */
      const clerkId = decoded.sub; // The id in database
      const user = await User.findOne({ clerkId });

      if (!user) {
        return res.sendStatus(404); // User not found;
      }
      next();
    } catch (error) {
      console.error("Error in Clerk middleware:", error);
      return res.sendStatus(401);
    }
  },
];

export const jwtParse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.sendStatus(401); // unAuthorized
  }

  // Bearer xjocijdofji13ej013ej3
  const token = authorization.split(" ")[1]; // Get the token
  //Decode the token
  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    const clerkId = decoded.sub; // The id in database

    const user = await User.findOne({ clerkId });

    if (!user) {
      res.sendStatus(401);
    }

    // Append to the user request, pass to the controller
    req.clerkId = clerkId as string;
    req.userId = user?._id.toString() as string;
    next(); // Finish the middleware, run the next function
  } catch (error) {
    return res.status(401); // Don't return the whole error, someone might hack!
  }
};
