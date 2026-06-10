import express from "express";
const router = express.Router();

import { liked_movies_by_user, movie_reviews, movie_reviews_by_id, movie_reviews_by_user } from "../controllers/movieController.js";

router.post("/movie-review", movie_reviews);
router.get("/liked-movies/:userId", liked_movies_by_user);
router.get("/movie-reviews/:movieId", movie_reviews_by_id);
router.get("/user-reviewed-movies/:userId", movie_reviews_by_user);

export default router;