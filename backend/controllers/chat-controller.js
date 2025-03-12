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

    // Populate latestMessage.sender properly
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
          select: "username, email, avtar",
        });

        res.status(200).json(results);
      });
  } catch (error) {
    console.error("failed to fetch chats", error);
  }
};

export const createGroupChat = async (req, res) => {
  try {
    const { users: usersRaw, name } = req.body;

    if (!usersRaw || !name) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    // Ensure `usersRaw` is parsed
    let users = Array.isArray(usersRaw) ? usersRaw : JSON.parse(usersRaw);

    if (users.length < 2) {
      return res.status(400).json({
        message: "More than 2 users are required to form a group chat",
      });
    }

    // Convert user IDs to ObjectId format
    users = users.map((user) => new mongoose.Types.ObjectId(user));

    // Add logged-in user to group
    users.push(new mongoose.Types.ObjectId(req.user.userId));

    // Create group chat
    const groupChat = await Chat.create({
      chatName: name,
      users: users,
      isGroupChat: true,
      groupAdmin: new mongoose.Types.ObjectId(req.user.userId),
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    console.error("Error creating group chat:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
