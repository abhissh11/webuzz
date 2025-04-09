import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/auth-route.js";
import userRouter from "./routes/user-route.js";
import messageRouter from "./routes/message-route.js";
import chatRouter from "./routes/chat-route.js";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://webuzz-chat.vercel.app",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const allowedOrigin = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://webuzz-chat.vercel.app",
];

// Middlewares
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.send("Hello from webuzz server");
});

app.use("/api/auth", authRouter);
app.use("/api", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/messages", messageRouter);

const PORT = process.env.PORT || 5000;

// MongoDB and server start
const startServer = async () => {
  try {
    await connectDB();
    console.log("Database connected successfully");

    server.listen(PORT, () => {
      console.log(`Server running on PORT: ${PORT}`);
    });
  } catch (error) {
    console.log("Failed to connect to database:", error);
    process.exit(1);
  }
};

startServer();

// ------------------ SOCKET.IO LOGIC ------------------

const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // When user logs in and sets up socket
  socket.on("setup", (userId) => {
    onlineUsers.set(userId, socket.id);
    socket.join(userId);
    console.log(`User ${userId} joined personal room`);
  });

  // Join chat room
  socket.on("joinChat", (chatId) => {
    socket.join(chatId);
    console.log(`User joined chat room: ${chatId}`);
  });

  // Handle sending a new message
  socket.on("newMessage", (message) => {
    const { chat, sender, receiver, content } = message;

    if (chat && chat._id) {
      io.to(chat._id).emit("messageReceived", message);
    }

    // Send notification to receiver if online
    if (receiver && receiver !== sender._id && onlineUsers.has(receiver)) {
      const receiverSocketId = onlineUsers.get(receiver);

      io.to(receiverSocketId).emit("notificationReceived", {
        from: sender,
        chatId: chat._id,
        content,
      });
    }
  });

  // Disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    for (let [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
  });
});
