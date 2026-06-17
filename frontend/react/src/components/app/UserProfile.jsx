import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "./NavBar";
import "./Profile.css";
import API_URL from "../config"

function UserProfile() {
  const { id } = useParams();

  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [comments, setComments] = useState([]);
  const [reviewedMovies, setReviewedMovies] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  const [interests, setInterests] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  async function fetchUser() {
    try {
      const response = await fetch(`${API_URL}/user/${id}`);

      const data = await response.json();

      setUser(data.user);

      setPosts(data.posts);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchComments() {
    try {
      const response = await fetch(
        `${API_URL}/movie-comments/${id}`,
      );

      const data = await response.json();

      setComments(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchInterests() {
    try {
      const response = await fetch(
        `${API_URL}/users/${id}/interests`,
      );

      const data = await response.json();

      setInterests(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchFollowData() {
    try {
      const response = await fetch(`${API_URL}/follow-data/${id}`);

      const data = await response.json();

      setFollowers(data.followers);

      setFollowing(data.following);
    } catch (error) {
      console.log(error);
    }
  }

  async function checkFollowing() {
    try {
      const response = await fetch(
        `${API_URL}/is-following/${loggedUser.id}/${id}`,
      );

      const data = await response.json();

      setIsFollowing(data.following);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchReviewedMovies() {
    try {
      const response = await fetch(
        `${API_URL}/user-reviewed-movies/${id}`,
      );

      const data = await response.json();

      setReviewedMovies(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchLikedSongs() {
    try {
      const response = await fetch(`${API_URL}/liked-songs/${id}`);
      const data = await response.json();

      setLikedSongs(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function followUser() {
    try {
      const response = await fetch(`${API_URL}/follow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          followerId: loggedUser.id,
          followingId: id,
        }),
      });

      const data = await response.json();

      alert(data.message);

      if (data.message === "Followed successfully") {
        setFollowers(Number(followers) + 1);
        setIsFollowing(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function unfollowUser() {
    try {
      const response = await fetch(`${API_URL}/unfollow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          followerId: loggedUser.id,
          followingId: id,
        }),
      });

      const data = await response.json();

      if (data.message === "Unfollowed") {
        setIsFollowing(false);
        setFollowers((prev) => prev - 1);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUser();
    fetchFollowData();
    fetchComments();
    fetchReviewedMovies();
    fetchLikedSongs();
    fetchInterests();
    checkFollowing();
  }, [id]);

  return (
    <>
      <Navbar />

      <div className="profile-page">
        <div className="profile-header">
          <div className="top-actions">
            {loggedUser.id !== user?.id && (
              <div className="profile-buttons">
                {isFollowing ? (
                  <button
                    className="follow-btn following"
                    onClick={unfollowUser}
                  >
                    Following ✓
                  </button>
                ) : (
                  <button className="follow-btn" onClick={followUser}>
                    Follow ✨
                  </button>
                )}

                <Link to={`/chat/${user?.id}`}>
                  <button className="message-btn">Message 💬</button>
                </Link>
              </div>
            )}
          </div>

          <div className="profile-avatar">{user?.username?.[0]}</div>

          <div className="profile-details">
            <h1>{user?.username}</h1>

            <p>Creator ✨</p>

            <div className="profile-stats">
              <div>
                <span>{posts.length}</span>
                Posts
              </div>

              <div>
                <span>{followers}</span>
                Followers
              </div>

              <div>
                <span>{following}</span>
                Following
              </div>
            </div>
          </div>
        </div>
        <div className="interests-section">
          <h2>🌊 Interests</h2>

          <div className="interests-bubbles">
            {interests.map((interest) => (
              <div key={interest.id} className="interest-bubble">
                <span className="interest-name">{interest.interest}</span>

                <span className="interest-level">{interest.level}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="activity-section">
          <div className="liked-section">
            <h2>🎬 Reviewed Movies</h2>

            <div className="liked-grid">
              {reviewedMovies.map((movie) => (
                <div className="liked-card" key={movie.id}>
                  <img src={movie.movie_image} alt={movie.movie_name} />

                  <p>{movie.movie_name}</p>

                  <span>{movie.review}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="liked-section">
            <h2>🎵 Liked Songs</h2>

            <div className="liked-grid">
              {likedSongs.map((song) => (
                <div className="liked-card" key={song.id}>
                  <img src={song.song_image} alt={song.song_name} />

                  <p>{song.song_name}</p>

                  <span>{song.artist_name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="profile-posts">
          {posts.map((post) => (
            <div className="post-card" key={post.id}>
              <img src={post.image} alt="post" />

              <div className="post-info">
                <p>{post.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default UserProfile;
