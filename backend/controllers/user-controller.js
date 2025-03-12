import mongoose from "mongoose";
import User from "../models/user-model.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const searchUser = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            {
              username: { $regex: req.query.search, $options: "i" },
            },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    const users = await User.find({
      ...keyword,
      _id: { $ne: new mongoose.Types.ObjectId(req.user.userId) },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error finding users: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
