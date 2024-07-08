import express, { Request, Response } from "express";
import cors from "cors";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to database!"));

const app = express(); // create express app



// Use middleware
app.use(express.json()); // Turn request to json
app.use(cors());

// All the request from this url handled by myUserRoute
// /api/my/user
app.use("/api/my/user", myUserRoute)

// Run server and listen to 7000
app.listen(7000, () => {
  console.log("server started on localhost:7000");
});
