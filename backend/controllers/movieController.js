import pool from "../config/db.js";

export const liked_movies_by_user = async (req, res) => {
    try {
      const { userId } = req.params;

      const movies = await pool.query(
        `SELECT * FROM liked_movies
           WHERE user_id = $1`,

        [userId],
      );

      res.json(movies.rows);
    } catch (error) {
      console.log(error);
    }
}

export const movie_reviews = async (req, res) => {
    try {
      const {
        userId,

        movieId,

        movieName,

        movieImage,

        review,
      } = req.body;

      const existingReview = await pool.query(
        `SELECT * FROM movie_reviews

           WHERE user_id = $1
           AND movie_id = $2`,

        [userId, movieId],
      );

      if (existingReview.rows.length > 0) {
        return res.json({
          message: "Already reviewed",
        });
      }

      const newReview = await pool.query(
        `INSERT INTO movie_reviews

          (user_id,
           movie_id,
           movie_name,
           movie_image,
           review)

          VALUES ($1,$2,$3,$4,$5)

          RETURNING *`,

        [userId, movieId, movieName, movieImage, review],
      );

      res.json({
        message: "Review added",

        review: newReview.rows[0],
      });
    } catch (error) {
      console.log(error);
    }
}

export const movie_reviews_by_id = async (req, res) => {
    try {
      const { movieId } = req.params;

      const reviews = await pool.query(
        `SELECT movie_reviews.*,
                  users.username

           FROM movie_reviews

           JOIN users
           ON users.id = movie_reviews.user_id

           WHERE movie_id = $1

           ORDER BY created_at DESC`,

        [movieId],
      );

      res.json(reviews.rows);
    } catch (error) {
      console.log(error);
    }
}

export const movie_reviews_by_user = async (req, res) => {
    try {
      const { userId } = req.params;

      const movies = await pool.query(
        `SELECT *
           FROM movie_reviews

           WHERE user_id = $1

           ORDER BY created_at DESC`,

        [userId],
      );

      res.json(movies.rows);
    } catch (error) {
      console.log(error);
    }
}