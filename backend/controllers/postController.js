import pool from "../config/db.js";

export const posts = async (req, res) => {
    try {
      const { userId, caption, image } = req.body;

      const newPost = await pool.query(
        `INSERT INTO posts
          (user_id, caption, image)

          VALUES ($1, $2, $3)

          RETURNING *`,

        [userId, caption, image],
      );

      res.json({
        message: "Post created",

        post: newPost.rows[0],
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server error",
      });
    }
}

export const userPost = async (req, res) => {
    try {
      const { userId } = req.params;

      const posts = await pool.query(
        `SELECT * FROM posts
           WHERE user_id = $1
           ORDER BY created_at DESC`,

        [userId],
      );

      res.json(posts.rows);
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server error",
      });
    }
}

export const liked_post = async (req, res) => {
    try {
      const {
        userId,

        postId,
      } = req.body;

      const existingLike = await pool.query(
        `SELECT * FROM post_likes
           WHERE user_id = $1
           AND post_id = $2`,

        [userId, postId],
      );

      if (existingLike.rows.length > 0) {
        return res.json({
          message: "Already liked",
        });
      }

      await pool.query(
        `INSERT INTO post_likes
        (user_id, post_id)

        VALUES ($1, $2)`,

        [userId, postId],
      );

      await pool.query(
        `UPDATE posts
         SET likes = likes + 1
         WHERE id = $1`,

        [postId],
      );

      res.json({
        message: "Post liked",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server error",
      });
    }
}