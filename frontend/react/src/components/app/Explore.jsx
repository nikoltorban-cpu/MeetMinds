import "./Explore.css";
import Navbar from "./NavBar";
import InterestBubble from "../InterestBubble";

function Explore() {

  const categories = [
    {
      text: "Movies",
      route: "/movies"
    },
    {
      text: "Music",
      route: "/music"
    },
    {
      text: "Sport",
      route: "/sport"
    },
    {
      text: "Gaming",
      route: "/gaming"
    },
    {
      text: "Travel",
      route: "/travel"
    },
    {
      text: "Books",
      route: "/books"
    },
    {
      text: "Food",
      route: "/food"
    },
    {
      text: "Tech",
      route: "/tech"
    },
    {
      text: "Pets",
      route: "/pets"
    }

  ];

  return (
    <>
      <Navbar />
      <div className="explore-page">

        <h1 className="explore-title">
          Explore Interests
        </h1>

        <div className="bubble-container">

          {categories.map((category, index) => (

            <InterestBubble
              key={index}
              text={category.text}
              route={category.route}
            />

          ))}

        </div>

      </div>
    </>
  );
}

export default Explore;