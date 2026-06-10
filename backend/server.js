import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import followRoutes from "./routes/followRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import musicRoutes from "./routes/musicRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import interestsRouter from "./routes/interestsRoutes.js";
import likesRouter from "./routes/likesRoutes.js";
import recommendedUsersRoutes from "./routes/recommendedUsersRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(authRoutes);
app.use(postRoutes);
app.use(followRoutes);
app.use(messageRoutes);
app.use(movieRoutes);
app.use(musicRoutes);
app.use(userRoutes);
app.use(interestsRouter);
app.use(likesRouter);
app.use(recommendedUsersRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
