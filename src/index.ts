import express, {Request, Response} from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(express.json());// Turn request to json
app.use(cors());

//Backend gets request from "/test" and response
app.get("/test", async(req:Request, res: Response) => {
    res.json({message:"hi"})
})