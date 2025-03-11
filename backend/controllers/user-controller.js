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
