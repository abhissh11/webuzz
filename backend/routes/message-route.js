import express from "express";
// import { getMessages } from "../controllers/message-controller.js";

const router = express.Router();

router.get("/messages/:senderId/:receiverId");

export default router;
