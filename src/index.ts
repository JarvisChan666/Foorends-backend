import express, { Application, Request, Response } from "express";
import cors from "cors";
import {
  ClerkExpressWithAuth,
  LooseAuthProp,
  WithAuthProp,
} from "@clerk/clerk-sdk-node";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";

declare global {
  namespace Express {
    interface Request extends LooseAuthProp {}
  }
}

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to database!"));

export const app: Application = express(); // create express app

// Use middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json()); // Turn request to json
app.use(ClerkExpressWithAuth());

// All the request from this url handled by myUserRoute
// /api/my/user
app.use("/api/my/user", myUserRoute);

// Run server and listen to 7000
app.listen(7000, () => {
  console.log("server started on localhost:7000");
});
