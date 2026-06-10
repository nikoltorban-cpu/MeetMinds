import pool from "../config/db.js";

export async function likeAlbum(req, res) {
  const { userId, albumId } = req.body;

  try {
    const existing = await pool.query(
      `
      SELECT *
      FROM music_likes
      WHERE user_id = $1
      AND album_id = $2
      `,
      [userId, albumId],
    );

    if (existing.rows.length > 0) {
      return res.json({
        message: "Already liked",
      });
    }

    await pool.query(
      `
      INSERT INTO music_likes
      (user_id, album_id)
      VALUES ($1,$2)
      `,
      [userId, albumId],
    );

    res.json({
      message: "Liked",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json(error);
  }
}

export async function getAlbumLikes(req, res) {
  const { albumId } = req.params;

  try {
    const result = await pool.query(
      `
      SELECT COUNT(*) AS likes
      FROM liked_songs
      WHERE album_id = $1
      `,
      [albumId],
    );

    res.json({
      likes: Number(result.rows[0].likes),
    });
  } catch (error) {
    console.log(error);

    res.status(500).json(error);
  }
}

export async function getTrackLikes(req, res) {
  const { trackId } = req.params;

  try {
    const result = await pool.query(
      `

      SELECT COUNT(*) AS likes

      FROM liked_songs

      WHERE track_id = $1

      `,

      [trackId],
    );

    res.json({
      likes: Number(result.rows[0].likes),
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
}

export async function getLikedTracks(req, res) {
  const { userId } = req.params;

  try {
    const result = await pool.query(
      `
      SELECT track_id
      FROM liked_songs
      WHERE user_id = $1
      `,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
}
