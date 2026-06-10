import express from "express";
const router = express.Router();

import { posts, userPost, liked_post } from "../controllers/postController.js";

router.post("/posts", posts);
router.post("/like-post", liked_post);
router.get("/posts/:userId", userPost);

export default router;