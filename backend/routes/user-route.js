import express from "express";
import { getUsers, searchUser } from "../controllers/user-controller.js";
import { protect } from "../middlewares/authenticate.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/user", protect, searchUser);

export default router;
