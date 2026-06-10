import { Link } from "react-router-dom";

function InterestBubble({ text, route }) {
  return (
    <Link
      to={route}
      style={{ textDecoration: "none" }}
    >
      <div className="category-bubble">
        {text}
      </div>
    </Link>
  );
}
export default InterestBubble;