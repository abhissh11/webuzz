import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/auth-route.js";
import userRouter from "./routes/user-route.js";
import messageRouter from "./routes/message-route.js";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const server = createServer(app); //create http server
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:5173"], // Allow frontend origins
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const allowedOrigin = ["http://localhost:3000", "http://localhost:5173"];

//middlewares
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

//routes
app.get("/", (req, res) => {
  res.send("Hello from webuzz server");
});
app.use("/api/auth", authRouter);
app.use("/api", userRouter);
app.use("/api", messageRouter);

const PORT = process.env.PORT || 5000;

//connect to mongodb and starting server
const startServer = async () => {
  try {
    await connectDB();
    console.log("database connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on PORT : ${PORT}`);
    });
  } catch (error) {
    console.log("Failed to connect to database: ", error);
    process.exit(1);
  }
};

startServer();

// socket io server connection
io.on("connection", (socket) => {
  console.log("A user connected: ", socket.id);

  //handle user joining a chat room
  socket.on("joinRoom", (userId) => {
    socket.join(userId); //Join a room with the user's ID
    console.log(`User ${userId} joined room`);
  });

  // handle sending messages
  socket.on("sendMessage", (message) => {
    const { receiverId } = message;
    io.to(receiverId).emit("receiveMessage", message);
  });

  //handle user disconnection
  socket.io("disconnect", () => {
    console.log("A user disconnected: ", socket.id);
  });
});
