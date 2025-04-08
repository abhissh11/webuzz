import express from "express";
import { protect } from "../middlewares/authenticate.js";
import {
  getMesssages,
  sendMesssage,
} from "../controllers/message-controller.js";

const router = express.Router();

// ✅ Fetch messages between two users
router.get("/:chatId", protect, getMesssages);

// ✅ Send a message
router.post("/", protect, sendMesssage);

export default router;
