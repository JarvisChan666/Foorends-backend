import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to database!"));

const app = express();
app.use(express.json()); // Turn request to json
app.use(cors());

//Backend gets request from "/test" and response
app.get("/test", async (req: Request, res: Response) => {
  res.json({ message: "hi" });
});

app.listen(7000, () => {
  console.log("server started on localhost:7000");
});
