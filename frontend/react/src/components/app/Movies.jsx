import { useEffect, useState } from "react";
import axios from "axios";
import API_KEY from "../api/tmdb";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import RecommendedUsers from "./RecommendedUsers";

import "./Movies.css";
import Navbar from "./NavBar";
import MovieCard from "./MovieCard";

const genres = [
  { id: 27, name: "Horror", icon: "👻" },
  { id: 35, name: "Comedy", icon: "😂" },
  { id: 878, name: "Sci-Fi", icon: "🚀" },
  { id: 10749, name: "Romance", icon: "💕" },
  { id: 53, name: "Thriller", icon: "🔪" },
  { id: 28, name: "Action", icon: "💥" },
  { id: 16, name: "Animation", icon: "🎨" },
  { id: 12, name: "Adventure", icon: "🗺️" },
  { id: 14, name: "Fantasy", icon: "🧙" },
];

const levels = [
  "Occasional Viewer 🌱",
  "Movie Fan 🍿",
  "Film Enthusiast 🎬",
  "Movie Addict 🔥",
  "Cinema Expert 🏆",
];

function Movies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [showMovies, setShowMovies] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [savedGenre, setSavedGenre] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  async function fetchMovies(reset = false) {
    if (loading) return;

    setLoading(true);

    try {
      const genreFilter = selectedGenre
        ? `&with_genres=${selectedGenre.id}`
        : "";

      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${reset ? 1 : page}${genreFilter}`,
      );

      if (reset) {
        setMovies(response.data.results);
        setPage(2);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...response.data.results]);

        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }
  async function saveMovieInterest() {
    if (!selectedGenre || !selectedLevel) {
      alert("Please select a level");
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      await axios.post("http://localhost:3000/interests", {
        userId: user.id,
        category: "Movies",
        interest: selectedGenre.name,
        level: selectedLevel,
      });

      alert(`${selectedGenre.name} saved 🎬`);

      setSelectedLevel("");
      setSavedGenre(selectedGenre.name);
      setSelectedGenre(null);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (showMovies) {
      fetchMovies(true);
    }
  }, [selectedGenre]);

  useEffect(() => {
    function handleScroll() {
      if (!showMovies) return;

      const bottom =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100;

      if (bottom) {
        fetchMovies();
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, loading, showMovies]);
  

  return (
    <>
      <Navbar />

      <div className="movies-page">
        <Link to="/explore">
          <button className="goback">← Back</button>
        </Link>

        <h1 className="movies-title">🎬 Movies</h1>

        <p className="movies-subtitle">
          Discover movie genres you love and explore films with the community.
        </p>

        <div className="genres-grid">
          {genres.map((genre) => (
            <button
              key={genre.id}
              disabled={!user}
              className={`genre-bubble ${
                selectedGenre?.id === genre.id ? "active-genre" : ""
              }`}
              onClick={() =>
                setSelectedGenre(selectedGenre?.id === genre.id ? null : genre)
              }
            >
              {genre.icon} {genre.name}
            </button>
          ))}
        </div>

        {selectedGenre && (
          <div className="movie-interest-card">
            <h2>
              {selectedGenre.icon} {selectedGenre.name}
            </h2>

            <p>How much do you enjoy this genre?</p>

            <div className="movie-levels">
              {levels.map((level) => (
                <button
                  key={level}
                  className={`movie-level-btn ${
                    selectedLevel === level ? "selected-level" : ""
                  }`}
                  onClick={() => setSelectedLevel(level)}
                >
                  {level}
                </button>
              ))}
            </div>

            <button className="save-genre-btn" onClick={saveMovieInterest}>
              Save Genre 🎬
            </button>
          </div>
        )}
        {savedGenre && (
        <RecommendedUsers interest={savedGenre} userId={user.id} />
        )}

        <div className="browse-section">
          <button
            className="browse-btn"
            onClick={() => {
              setShowMovies(!showMovies);

              if (!showMovies) {
                fetchMovies(true);
              }
            }}
          >
            {showMovies ? "Hide Movies 🌊" : "Browse Movies 🌊"}
          </button>
        </div>

        {showMovies && (
          <>
            <div className="movies-grid">
              {movies.map((movie) => (
                <MovieCard key={uuidv4()} movie={movie} />
              ))}
            </div>

            {loading && <h2 className="loading">Loading more movies...</h2>}
          </>
        )}
      </div>
    </>
  );
}

export default Movies;
