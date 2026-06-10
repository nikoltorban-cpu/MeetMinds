import express from "express";
const router = express.Router();

import { likeAlbum, getAlbumLikes, getTrackLikes, getLikedTracks } from "../controllers/likesController.js";

router.post("/music-like", likeAlbum);
router.get("/album-likes/:albumId", getAlbumLikes);
router.get("/track-likes/:trackId", getTrackLikes);
router.get("/liked-tracks/:userId", getLikedTracks);

export default router;
