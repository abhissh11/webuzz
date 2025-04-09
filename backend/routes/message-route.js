import express from "express";
import { protect } from "../middlewares/authenticate.js";
import {
  getMesssages,
  sendMesssage,
} from "../controllers/message-controller.js";

const router = express.Router();

router.get("/:chatId", protect, getMesssages);

router.post("/", protect, sendMesssage);

export default router;
