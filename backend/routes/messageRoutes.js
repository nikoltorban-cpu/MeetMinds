import express from "express";
const router = express.Router();

import { conversations, messages, messagesBetweenUsers, unreadMessagesCount, markMessagesAsRead } from "../controllers/messageController.js";

router.post("/messages", messages);
router.get("/messages/:user1/:user2", messagesBetweenUsers);
router.get("/conversations/:userId", conversations);
router.get("/unread-messages/:userId",unreadMessagesCount);
router.put("/messages/read", markMessagesAsRead);

export default router;