import express from "express";
const router = express.Router();

import { users, userId } from "../controllers/usersController.js"

router.get("/users", users);
router.get("/user/:id", userId);

export default router;