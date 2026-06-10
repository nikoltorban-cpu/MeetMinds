import pool from "../config/db.js";

export async function getRecommendedUsersInterests(req, res) {
  const { userId, interest } = req.params;

  try {
    const result = await pool.query(
      `
      SELECT DISTINCT
      u.id,
      u.username,
      i.interest,
      i.level
      FROM users u
      JOIN user_interests i
      ON u.id = i.user_id
      WHERE i.interest = $2
      AND u.id != $1
      LIMIT 12
      `,
      [userId, interest],
    );

    res.json(result.rows);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
}

export async function getRecommendedUsers(req, res) {
  const { userId, interest } = req.params;

  if (!userId || isNaN(userId)) {
    return res.json([]);
  } 
    try {
      const result = await pool.query(
        `
        SELECT
        u.id,
        u.username,
        ARRAY_AGG(i.interest) AS interests,
        ARRAY_AGG(i.level) AS levels
        FROM users u
        JOIN user_interests i
        ON u.id = i.user_id
        WHERE i.interest IN (
          SELECT interest
          FROM user_interests
          WHERE user_id = $1
        )
        AND u.id != $1
        GROUP BY u.id, u.username
        LIMIT 12;
        `,
        [userId],
      );

      res.json(result.rows);
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server error",
      });
    }
  }


export async function getNewUsers(req, res) {
  try {
    const result = await pool.query(
      `
      SELECT id, username
      FROM users
      ORDER BY id DESC
      LIMIT 10
      `,
    );

    res.json(result.rows);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
}
