import { useState } from "react";
import { useEffect } from "react";
import API_URL from "../config"

function MovieCard({ movie }) {
  const [watched, setWatched] = useState(false);
  const [wantToWatch, setWantToWatch] = useState(false);
  const [points, setPoints] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [reviewed, setReviewed] = useState(false);

  function handleWatched() {
    if (!watched) {
      setWatched(true);
      setPoints(points + 5);
    }
  }

  async function fetchReviews() {
    try {
      const response = await fetch(
        `${API_URL}/movie-reviews/${movie.id}`,
      );

      const data = await response.json();

      setReviews(data);

      const alreadyReviewed = data.find((r) => r.user_id === user.id);

      if (alreadyReviewed) {
        setReviewed(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function submitReview() {
    if (!review) return;

    try {
      const response = await fetch(
        `${API_URL}/movie-review`,

        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            userId: user.id,

            movieId: movie.id,

            movieName: movie.title,

            movieImage: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,

            review,
          }),
        },
      );

      const data = await response.json();

      if (data.message === "Already reviewed") {
        alert("You already reviewed this movie ");

        return;
      }

      setReviewed(true);

      setReviews([
        {
          username: user.username,

          review,
        },

        ...reviews,
      ]);

      setReview("");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="movie-card">
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />

      <div className="movie-info">
        <h2>{movie.title}</h2>
        <p>⭐ {movie.vote_average}</p>

        <p className="movie-description">
          {showMore ? movie.overview : `${movie.overview.slice(0, 5000)}`}
        </p>


        </div>

        <div className="reviews-section">
          {!watched ? (
            <button className="movie-btn" onClick={() => setWatched(true)}>
              👀 Watched
            </button>
          ) : reviewed ? (
            <div className="reviewed-text">✅ You reviewed this movie!</div>
          ) : (
            <>
              <textarea
                placeholder="Write your review..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />

              <button className="movie-btn" onClick={submitReview}>
                Post Review
              </button>
            </>
          )}

          <div className="reviews-list">
            {reviews.map((review, index) => (
              <div className="review-card" key={index}>
                <h4>{review.username}</h4>

                <p>{review.review}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
}

export default MovieCard;
