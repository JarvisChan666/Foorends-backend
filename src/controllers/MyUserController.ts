import { Request, Response } from "express";
import User from "../models/user";

const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const currentUser = await User.findOne({ _id: req.userId });
    if (!currentUser) {
      return res.status(404).json({ message: "User not found " });
    }

    res.json(currentUser);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const createCurrentUser = async (req: Request, res: Response) => {
  // 1. check if the user exists
  // 2. create the user if isn't exist
  // 3. return user object to the calling client

  try {
    const { clerkId } = req.body;
    const existingUser = await User.findOne({ clerkId });
    console.log(existingUser);

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

const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const { name, addressLine1, country, city } = req.body;
    // Use "userId" instead of clerk, using userId from mongoDB, which is clean and readable
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    user.addressLine1 = addressLine1;
    user.city = city;
    user.country = country;

    await user.save();

    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating user" });
  }
};

export default {
  getCurrentUser,
  createCurrentUser,
  updateCurrentUser,
};
