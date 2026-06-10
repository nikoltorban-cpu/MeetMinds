import pool from "../config/db.js";

export const follow = async (req, res) => {
    try {
      const {
        followerId,

        followingId,
      } = req.body;

      if (followerId === followingId) {
        return res.json({
          message: "You cannot follow yourself",
        });
      }

      const existingFollow = await pool.query(
        `SELECT * FROM follows
           WHERE follower_id = $1
           AND following_id = $2`,

        [followerId, followingId],
      );

      if (existingFollow.rows.length > 0) {
        return res.json({
          message: "Already following",
        });
      }

      await pool.query(
        `INSERT INTO follows
        (follower_id, following_id)

        VALUES ($1, $2)`,

        [followerId, followingId],
      );

      res.json({
        message: "Followed successfully",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server error",
      });
    }
}

export const unfollow = async (req, res) => {
    try {
      const {
        followerId,

        followingId,
      } = req.body;

      await pool.query(
        `DELETE FROM follows
         WHERE follower_id = $1
         AND following_id = $2`,

        [followerId, followingId],
      );

      res.json({
        message: "Unfollowed",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server error",
      });
    }
}

export const following = async (req, res) => {
    try {
      const { userId } = req.params;

      const following = await pool.query(
        `SELECT users.id,
                  users.username,
                  users.email

           FROM follows

           JOIN users

           ON follows.following_id = users.id

           WHERE follows.follower_id = $1`,

        [userId],
      );

      res.json(following.rows);
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server error",
      });
    }
}

export const follow_data = async (req, res) => {
    try {
      const { userId } = req.params;

      const followers = await pool.query(
        `SELECT COUNT(*)
           FROM follows
           WHERE following_id = $1`,

        [userId],
      );

      const following = await pool.query(
        `SELECT COUNT(*)
           FROM follows
           WHERE follower_id = $1`,

        [userId],
      );

      res.json({
        followers: followers.rows[0].count,

        following: following.rows[0].count,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server error",
      });
    }
}

export const isFollowing = async (req, res) => {
  try {
    const { followerId, followingId } = req.params;

    const result = await pool.query(
      `
      SELECT *
      FROM follows
      WHERE follower_id = $1
      AND following_id = $2
      `,
      [followerId, followingId]
    );

    res.json({
      following: result.rows.length > 0,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};