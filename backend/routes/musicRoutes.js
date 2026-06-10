import express from "express";
const router = express.Router();

import { liked_songs, liked_songs_by_user } from "../controllers/musicController.js";

router.post("/liked-songs", liked_songs);
router.get("/liked-songs/:userId", liked_songs_by_user);

export default router;