import express from "express";
const router = express.Router();

import { add_interest, get_user_interests } from "../controllers/interestsController.js";

router.post("/interests", add_interest);
router.get("/users/:id/interests", get_user_interests);

export default router;