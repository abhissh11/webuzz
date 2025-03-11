import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/auth-route.js";
import userRouter from "./routes/user-route.js";

dotenv.config();

const app = express();

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

// // Error middleware
// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || "Internal Server Error";
//   res.status(statusCode).json({
//     success: false,
//     statusCode,
//     message,
//   });
// });
