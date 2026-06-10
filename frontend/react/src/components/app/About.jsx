import "./About.css";
import Navbar from "./NavBar";
import { Link } from "react-router-dom";

function About() {
  return (
    <>
      <Navbar />
      <div className="about-page">
        <Link to="/explore">
          <button className="goback">← Back</button>
        </Link>
        <div className="about-hero">
          <h1>About The App</h1>

          <p>
            Ever wanted to meet new people but had no idea where to start?
            <br />
            This app was built around one simple idea: real connections begin
            with shared interests. Instead of awkward small talk and trying to
            figure out what to ask, people can instantly discover what others
            love — movies, music, aesthetics, hobbies, thoughts, and more. The
            app creates a space where conversations feel natural, because you
            already have something meaningful in common ✨
          </p>
        </div>

        <div className="about-grid">
          <div className="about-card">
            <div className="about-icon">🎬</div>

            <h2>Discover Movies</h2>

            <p>
              Explore movies, share reviews, collect points, and show your taste
              through your profile.
            </p>
          </div>

          <div className="about-card">
            <div className="about-icon">🎵</div>

            <h2>Share Music</h2>

            <p>
              Find music, like albums, and express your vibe through the songs
              you love.
            </p>
          </div>

          <div className="about-card">
            <div className="about-icon">📸</div>

            <h2>Post Your Moments</h2>

            <p>
              Upload aesthetic posts, thoughts, memories, and favorite
              experiences.
            </p>
          </div>

          <div className="about-card">
            <div className="about-icon">💖</div>

            <h2>Build Connections</h2>

            <p>
              Connect with people through shared interests instead of just
              appearances.
            </p>
          </div>

          <div className="about-card">
            <div className="about-icon">🌌</div>

            <h2>Personalized Interests</h2>

            <p>
              Create your own profile vibe with movies, music, aesthetics, and
              categories.
            </p>
          </div>

          <div className="about-card">
            <div className="about-icon">✨</div>

            <h2>Aesthetic Experience</h2>

            <p>
              Soft glassmorphism design, floating layouts, and a cozy
              social-media atmosphere.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
