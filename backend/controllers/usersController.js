import pool from "../config/db.js";

export const users = async (req, res) => {
  try {
    const { search } = req.query;

    const users = await pool.query(
      `SELECT id, username, email
           FROM users
           WHERE username ILIKE $1`,

      [`%${search}%`],
    );

    res.json(users.rows);
  } catch (error) {
    console.log(error);

    res.status(501).json({
      message: "Server error",
    });
  }
};

export const userId = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await pool.query(
      `SELECT id, username, email
           FROM users
           WHERE id = $1`,

      [id],
    );

    const posts = await pool.query(
      `SELECT *
           FROM posts
           WHERE user_id = $1
           ORDER BY created_at DESC`,

      [id],
    );

    res.json({
      user: user.rows[0],

      posts: posts.rows,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};
