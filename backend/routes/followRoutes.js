import express from "express";
const router = express.Router();

import {
  follow,
  follow_data,
  unfollow,
  following,
  isFollowing
} from "../controllers/followController.js";

router.post("/follow", follow);
router.post("/unfollow", unfollow);
router.get("/follow-data/:userId", follow_data);
router.get("/following/:userId", following);
router.get("/is-following/:followerId/:followingId", isFollowing);

export default router;
