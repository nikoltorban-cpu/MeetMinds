import pool from "../config/db.js";

export const liked_songs = async (req, res) => {
  try {
    const {
      userId,
      trackId,
      albumId,
      songName,
      artistName,
      songImage,
    } = req.body;

    const existingSong = await pool.query(
      `SELECT * FROM liked_songs

           WHERE user_id = $1
           AND song_name = $2`,

      [userId, songName],
    );

    if (existingSong.rows.length > 0) {
      return res.json({
        message: "Song already liked",
      });
    }

    const newSong = await pool.query(
      `INSERT INTO liked_songs

      (
        user_id,
        track_id,
        album_id,
        song_name,
        artist_name,
        song_image
      )  
      VALUES ($1,$2,$3,$4,$5,$6)

          RETURNING *`,

      [userId, trackId, albumId, songName, artistName, songImage],
    );

    res.json({
      message: "Song liked",

      song: newSong.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
};

export const liked_songs_by_user = async (req, res) => {
  try {
    const { userId } = req.params;

    const songs = await pool.query(
      `SELECT * FROM liked_songs

           WHERE user_id = $1

           ORDER BY id DESC`,

      [userId],
    );

    res.json(songs.rows);
  } catch (error) {
    console.log(error);
  }
};
