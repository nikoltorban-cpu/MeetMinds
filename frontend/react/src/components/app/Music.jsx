import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Music.css";
import Navbar from "./NavBar";
import { Link } from "react-router-dom";
import axios from "axios";
import RecommendedUsers from "./RecommendedUsers";

const genres = [
  { name: "Pop", icon: "🎤" },
  { name: "Rock", icon: "🎸" },
  { name: "Rap", icon: "🎙" },
  { name: "Hip Hop", icon: "🔥" },
  { name: "EDM", icon: "🎧" },
  { name: "Jazz", icon: "🎷" },
  { name: "Classical", icon: "🎹" },
  { name: "Indie", icon: "🎵" },
  { name: "Country", icon: "🤠" },
  { name: "K-Pop", icon: "🇰🇷" },
];

const levels = [
  "Casual Listener 🌱",
  "Music Lover 🎵",
  "Playlist Creator 🎧",
  "Super Fan 🔥",
  "Music Expert 🏆",
];

function Music() {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [showAlbums, setShowAlbums] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [albumLikes, setAlbumLikes] = useState({});
  const [savedInterest, setSavedInterest] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  async function fetchAlbums() {
    try {
      const artists = [
        "taylor swift",
        "drake",
        "the weeknd",
        "ariana grande",
        "travis scott",
        "kendrick lamar",
        "billie eilish",
        "dua lipa",
        "rihanna",
        "eminem",
        "bruno mars",
        "sza",
        "olivia rodrigo",
      ];

      let allAlbums = [];

      for (const artist of artists) {
        try {
          const response = await fetch(
            `https://www.theaudiodb.com/api/v1/json/2/searchalbum.php?s=${encodeURIComponent(artist)}`,
          );

          const text = await response.text();

          if (!text) continue;

          const data = JSON.parse(text);

          if (data.album) {
            allAlbums = [...allAlbums, ...data.album];
          }

          setAlbums(allAlbums);

          allAlbums.forEach((album) => {
            fetchAlbumLikes(album.idAlbum);
          });
        } catch (error) {
          console.log(
            "Failed artist:",

            artist,
          );
        }
      }

      console.log(allAlbums.length);

      setAlbums(allAlbums);
    } catch (error) {
      console.log(error);
    }
  }

  async function saveMusicInterest() {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      await axios.post("http://localhost:3000/interests", {
        userId: user.id,
        category: "Music",
        interest: selectedGenre.name,
        level: selectedLevel,
      });

      alert("Music genre saved 🎵");

      setSavedInterest(selectedGenre.name);
      setSelectedLevel("");
      setSelectedGenre(null);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchAlbumLikes(albumId) {
    try {
      const response = await fetch(
        `http://localhost:3000/album-likes/${albumId}`,
      );

      const data = await response.json();

      setAlbumLikes((prev) => ({
        ...prev,
        [albumId]: data.likes,
      }));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <>
      <Navbar />
      <div className="music-page">
        <Link to="/explore">
          <button className="goback">← Back</button>
        </Link>
        <h1 className="music-title">🎵 Music</h1>

        <p className="music-subtitle">
          Discover genres you love and connect through music.
        </p>

        <div className="genres-grid">
          {genres.map((genre) => (
            <button
              key={genre.name}
              disabled={!user}
              className={`genre-bubble ${
                selectedGenre?.name === genre.name ? "active-genre" : ""
              }`}
              onClick={() => setSelectedGenre(genre)}
            >
              {genre.icon} {genre.name}
            </button>
          ))}
        </div>

        {selectedGenre && (
          <div className="music-interest-card">
            <h2>
              {selectedGenre.icon} {selectedGenre.name}
            </h2>

            <p>How much do you enjoy this genre?</p>

            <div className="music-levels">
              {levels.map((level) => (
                <button
                  key={level}
                  className={`music-level-btn ${
                    selectedLevel === level ? "selected-level" : ""
                  }`}
                  onClick={() => setSelectedLevel(level)}
                >
                  {level}
                </button>
              ))}
            </div>

            <button className="save-genre-btn" onClick={saveMusicInterest}>
              Save Genre 🎵
            </button>
          </div>
        )}

        {savedInterest && (
          <RecommendedUsers interest={savedInterest} userId={user.id} />
        )}

        <div className="browse-section">
          <button
            className="browse-btn"
            onClick={() => setShowAlbums(!showAlbums)}
          >
            {showAlbums ? "Hide Albums 🌊" : "Explore Albums 🌊"}
          </button>
        </div>
        {showAlbums && (
          <div className="music-grid">
            {albums.map((album) => {
              let image = album.strAlbumThumb;

              if (album.strAlbum === "Goosebumps") {
                image =
                  "https://i.scdn.co/image/ab67616d0000b2738752a7355996e64709247c53";
              }
              const spotifyUrl = `https://open.spotify.com/search/${encodeURIComponent(
                album.strAlbum + " " + album.strArtist,
              )}`;

              return (
                <div className="music-card" key={album.idAlbum}>
                  <img src={image} alt={album.strAlbum} />

                  <div className="music-info">
                    <h2>{album.strAlbum}</h2>

                    <p>{album.strArtist}</p>

                    <div className="album-name">{album.intYearReleased}</div>

                    <a
                      href={spotifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="listen-btn"
                    >
                      ▶ Listen in Spotify
                    </a>

                    <button
                      className="music-btn"
                      onClick={() =>
                        navigate("/tracks", {
                          state: { album },
                        })
                      }
                    >
                      🎵 View Tracks
                    </button>

                    <div className="likes-count">
                      ❤️ {albumLikes[album.idAlbum] || 0} likes
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default Music;
