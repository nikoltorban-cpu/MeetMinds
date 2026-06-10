import { useEffect, useState } from "react";

import "./Profile.css";
import Navbar from "./NavBar";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [posts, setPosts] = useState([]);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [interests, setInterests] = useState([]);
  const [reviewedMovies, setReviewedMovies] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);

  async function fetchPosts() {
    try {
      const response = await fetch(`http://localhost:3000/posts/${user.id}`);

      const data = await response.json();

      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchReviewedMovies() {
    try {
      const response = await fetch(
        `http://localhost:3000/user-reviewed-movies/${user.id}`,
      );

      const data = await response.json();

      setReviewedMovies(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchLikedSongs() {
    try {
      const response = await fetch(
        `http://localhost:3000/liked-songs/${user.id}`,
      );

      const data = await response.json();

      setLikedSongs(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function addPost() {
    if (!caption || !image) return;

    try {
      const response = await fetch(
        "http://localhost:3000/posts",

        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            userId: user.id,

            caption,

            image,
          }),
        },
      );

      const data = await response.json();

      setPosts([data.post, ...posts]);

      setCaption("");

      setImage("");

      setPreview("");
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchFollowData() {
    try {
      const response = await fetch(
        `http://localhost:3000/follow-data/${user.id}`,
      );

      const data = await response.json();

      setFollowers(data.followers);

      setFollowing(data.following);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleImageUpload(e) {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    formData.append("upload_preset", "myProject");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dkcxw3sjb/image/upload",

        {
          method: "POST",

          body: formData,
        },
      );

      const data = await response.json();

      setImage(data.secure_url);

      setPreview(data.secure_url);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchInterests() {
    try {
      const response = await fetch(
        `http://localhost:3000/users/${user.id}/interests`,
      );

      const data = await response.json();

      setInterests(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user) {
      fetchPosts();
      fetchFollowData();
      fetchInterests();
      fetchLikedSongs();
      fetchReviewedMovies();
    }
  }, []);

  async function likePost(postId) {
    try {
      const response = await fetch(
        "http://localhost:3000/like-post",

        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            userId: user.id,

            postId,
          }),
        },
      );

      const data = await response.json();

      if (data.message === "Already liked") {
        alert("You already liked this post");

        return;
      }

      setPosts(
        posts.map((post) =>
          post.id === postId
            ? {
                ...post,

                likes: (post.likes || 0) + 1,
              }
            : post,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function followUser(otherUserId) {
    try {
      const response = await fetch(
        "http://localhost:3000/follow",

        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            followerId: user.id,

            followingId: otherUserId,
          }),
        },
      );

      const data = await response.json();

      alert(data.message);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navbar />

      <div className="profile-page">
        <div className="profile-header">
          <div className="profile-avatar">{user?.username?.[0]}</div>

          <div className="profile-details">
            <h1>{user?.username}</h1>

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

        <div className="create-post">
          <h2>Create Post</h2>

          <label className="upload-box">
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            Upload Photo 📸
          </label>

          {preview && (
            <img src={preview} alt="preview" className="preview-image" />
          )}

          <textarea
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />

          <button onClick={addPost}>✨ Post</button>
        </div>

        <div className="interests-section">
          <h2>🌊 {user.username}'s Interests</h2>

          {interests.length === 0 ? (
            <p className="no-interests">No interests added yet.</p>
          ) : (
            <div className="interests-list">
              {interests.map((interest) => (
                <div key={interest.id} className="interest-card">
                  <span>{interest.interest} </span>
                  <small>{interest.level}</small>
                </div>
              ))}
            </div>
          )}
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
          {posts.length === 0 ? (
            <h2 className="no-posts">No posts yet.. </h2>
          ) : (
            posts.map((post) => (
              <div className="post-card" key={post.id}>
                <img src={post.image} alt="post" />

                <div className="post-info">
                  <p>{post.caption}</p>

                  <button
                    className="like-btn"
                    onClick={() => likePost(post.id)}
                  >
                    ❤️ {post.likes || 0}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
