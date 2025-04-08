import Chat from "../models/chat-model.js";
import Message from "../models/message-Model.js";
import User from "../models/user-model.js";

export const sendMesssage = async (req, res) => {
  const { content, chatId, receiverId } = req.body;

  if (!content || !chatId || !receiverId) {
    return res.status(400).json({ message: "Invalid data passed" });
  }

  const newMessage = {
    sender: req.user.userId,
    content,
    chat: chatId,
    receiver: receiverId,
  };

  try {
    let message = await Message.create(newMessage);
    message = await message.populate("sender", "username email avtar");
    message = await message.populate("receiver", "username email avtar");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "username email avtar",
    });
    await Chat.findByIdAndUpdate(chatId, { latestMessage: message });
    res.json(message);
  } catch (error) {
    console.log("Error sending message: ", error);
    res.status(500).json({ message: "Failed to send message" });
  }
};

//
export const getMesssages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "username email avtar")
      .populate("receiver", "username, email, avtar")
      .populate("chat");

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages: ", error);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};
