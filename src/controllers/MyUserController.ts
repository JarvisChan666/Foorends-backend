import { Request, Response } from "express";
import User from "../models/user";

const createCurrentUser = async (req: Request, res: Response) => {
  // 1. check if the user exists
  // 2. create the user if isn't exist
  // 3. return user object to the calling client

  try {
    const { clerkId } = req.body;
    const existingUser = await User.findOne({ clerkId });

    if (existingUser) {
      return res.status(200).send();
    }

    const newUser = new User(req.body);
    await newUser.save();

    // 201 means created
    // Turn mongoose object to js object
    res.status(201).json(newUser.toObject());
  } catch (error) {
    // error maybe sensitive so don't throw it all to the client!
    console.log(error);
    res.status(500).json({ message: "Error by creating user" });
  }
};

export default {
  createCurrentUser,
};
