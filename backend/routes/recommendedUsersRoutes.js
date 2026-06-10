import express from "express";

const router = express.Router();

import { getNewUsers, getRecommendedUsers, getRecommendedUsersInterests } from "../controllers/recommendedUsersController.js";

router.get("/recommended-users/:userId/:interest", getRecommendedUsersInterests);
router.get("/recommended-users/:userId", getRecommendedUsers);
router.get("/new-users", getNewUsers);

export default router;
