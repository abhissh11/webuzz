import express from "express";
import { protect } from "../middlewares/authenticate.js";
import {
  accessChat,
  createGroupChat,
  fetchChats,
} from "../controllers/chat-controller.js";

const router = express.Router();

router.post("/", protect, accessChat);
router.get("/", protect, fetchChats);
router.post("/group", protect, createGroupChat);
// router.put("/removemember", protect, removeFromGroup)
// router.put("/addmember", protect, addToGroup)

export default router;
