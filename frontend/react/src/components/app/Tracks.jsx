import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Tracks.css";
import Navbar from "./NavBar";
import { FaSpotify } from "react-icons/fa";


function Tracks() {
  const location = useLocation();
  const album = location.state?.album;
  const user = JSON.parse(localStorage.getItem("user"));

  const [tracks, setTracks] = useState([]);
  const [likedTracks, setLikedTracks] = useState([]);
  const [likes, setLikes] = useState({});

  async function fetchTracks() {
    try {
      const res = await fetch(
        `https://www.theaudiodb.com/api/v1/json/2/track.php?m=${album.idAlbum}`,
      );
      const data = await res.json();
      const loadedTracks = data.track || [];

      setTracks(loadedTracks);

      loadedTracks.forEach((track) => {
        fetchTrackLikes(track.idTrack);
      });
      setTracks(data.track || []);
    } catch (error) {
      console.log(error);
    }
  }

  async function toggleLike(track) {
    const alreadyLiked = likedTracks.includes(track.idTrack);

    if (alreadyLiked) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/liked-songs`,

        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            userId: user.id,
            trackId: track.idTrack,
            albumId: album.idAlbum,
            songName: track.strTrack,
            artistName: album.strArtist,
            songImage: album.strAlbumThumb,
          }),
        },
      );

      const data = await response.json();

      if (data.message === "Song already liked") {
        alert("Already liked ");

        return;
      }

      setLikedTracks((prev) => [...prev, track.idTrack]);

      setLikes({
        ...likes,

        [track.idTrack]: (likes[track.idTrack] || 0) + 1,
      });
    } catch (error) {
      console.log(error);
    }
  }

  function isLiked(trackId) {
    return likedTracks.includes(trackId);
  }

  async function fetchLikedTracks() {
    try {
      const response = await fetch(
        `${API_URL}/liked-tracks/${user.id}`,
      );

      const data = await response.json();

      setLikedTracks(data.map((track) => track.track_id));
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchTrackLikes(trackId) {
    try {
      const response = await fetch(
        `${API_URL}/track-likes/${trackId}`,
      );

      const data = await response.json();

      setLikes((prev) => ({
        ...prev,
        [trackId]: data.likes,
      }));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (album) {
      fetchTracks();
      fetchLikedTracks();
    }
  }, []);

  let albumImage = album?.strAlbumThumb;

  if (album?.strAlbum === "Goosebumps") {
    albumImage =
      "https://i.scdn.co/image/ab67616d0000b2738752a7355996e64709247c53";
  }

  return (
    <>
      <Navbar />
      <Link to="/music">
        <button className="goback">← Back</button>
      </Link>
      <div className="tracks-page">
        <div className="album-header">
          <img src={albumImage} alt={album?.strAlbum} />

          <div>
            <h1>{album?.strAlbum}</h1>

            <p>{album?.strArtist}</p>
          </div>
        </div>

        <div className="tracks-list">
          {tracks.map((track) => {
            return (
              <div className="track-card" key={track.idTrack}>
                <div>
                  <a
                    href={`https://open.spotify.com/search/${encodeURIComponent(
                      track.strTrack + " " + album.strArtist,
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="track-link"
                  >
                    <>
                      {track.strTrack}
                      <FaSpotify className="spotify-icon" />
                    </>
                  </a>
                </div>

                <button
                  className={`track-like-btn ${
                    isLiked(track.idTrack) ? "liked" : ""
                  }`}
                  onClick={() => toggleLike(track)}
                >
                  {isLiked(track.idTrack) ? "❤️" : "🤍"}
                </button>

                <div className="track-likes">
                  ❤️ {likes[track.idTrack] || 0}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Tracks;
