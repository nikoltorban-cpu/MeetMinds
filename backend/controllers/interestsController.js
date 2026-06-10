import pool from "../config/db.js";

export const add_interest = async (req, res) => {
  try {
    const {
      userId,
      category,
      interest,
      level,
    } = req.body;

    const existing = await pool.query(
      `
      SELECT *
      FROM user_interests
      WHERE user_id = $1
      AND interest = $2
      `,
      [userId, interest]
    );

    if (existing.rows.length > 0) {
      const updated = await pool.query(
        `
        UPDATE user_interests
        SET level = $1
        WHERE user_id = $2
        AND interest = $3
        RETURNING *
        `,
        [level, userId, interest]
      );

      return res.json({
        message: "Interest updated",
        interest: updated.rows[0],
      });
    }

    const result = await pool.query(
      `
      INSERT INTO user_interests
      (user_id, category, interest, level)
      VALUES ($1,$2,$3,$4)
      RETURNING *
      `,
      [
        userId,
        category,
        interest,
        level,
      ]
    );

    res.status(201).json({
      message: "Interest added",
      interest: result.rows[0],
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const get_user_interests = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const interests = await pool.query(
      `
      SELECT *
      FROM user_interests
      WHERE user_id = $1
      ORDER BY created_at DESC
      `,
      [id]
    );

    res.json(interests.rows);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};