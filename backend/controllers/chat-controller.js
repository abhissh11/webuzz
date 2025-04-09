import Chat from "./../models/chat-model.js";
import User from "./../models/user-model.js";
import mongoose from "mongoose";

export const accessChat = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      console.log("UserId param not sent with request");
      return res.status(400).json({ message: "User authentication required" });
    }

    const loggedInUserId = new mongoose.Types.ObjectId(req.user.userId);
    const targetUserId = new mongoose.Types.ObjectId(userId);

    let isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: loggedInUserId } } },
        { users: { $elemMatch: { $eq: targetUserId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    if (isChat.length > 0) {
      res.status(200).json(isChat[0]);
    } else {
      const chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [loggedInUserId, targetUserId],
      };

      const createdChat = await Chat.create(chatData);

      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );

      res.status(200).json(fullChat);
    }
  } catch (error) {
    console.error("Error accessing chat: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const fetchChats = async (req, res) => {
  try {
    const loggedInUserId = new mongoose.Types.ObjectId(req.user.userId);
    Chat.find({ users: { $elemMatch: { $eq: loggedInUserId } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "username email avtar",
        });

        res.status(200).json(results);
      });
  } catch (error) {
    console.error("failed to fetch chats", error);
  }
};

export const createGroupChat = async (req, res) => {
  try {
    const { name, users } = req.body;

    // Input validation
    if (!name || !users || !Array.isArray(users)) {
      return res
        .status(400)
        .json({ message: "Group name and users array are required" });
    }

    // Include the logged-in user
    const allUsers = [...users, req.user.userId];

    // Ensure group has at least 3 users (including creator)
    if (allUsers.length < 3) {
      return res
        .status(400)
        .json({ message: "A group must have at least 3 members" });
    }

    const groupChat = await chatModel.create({
      name,
      users: allUsers,
      isGroupChat: true,
      groupAdmin: req.user.userId,
    });

    const populatedChat = await chatModel
      .findById(groupChat._id)
      .populate("users", "username email avtar")
      .populate("groupAdmin", "username email avtar");

    return res.status(201).json(populatedChat);
  } catch (error) {
    console.error("Error creating group chat:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const removeFromGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(removed);
  }
};

export const addToGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(added);
  }
};
