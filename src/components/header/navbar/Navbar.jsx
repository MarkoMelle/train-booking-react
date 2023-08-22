import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { handleScroll } from "../../../utils";

export default function Navbar() {
  const location = useLocation();

  const handleLinkClick = (sectionId) => (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      handleScroll(sectionId);
    }
  };

  return (
    <nav className="nav">
      <ul className="nav-list nav-list">
        <li className="nav-item nav-item-logo">
          <Link to="/">Лого</Link>
        </li>
        <li className="nav-item">
          <Link
            to="/"
            state={{ scrollTo: "about" }}
            onClick={handleLinkClick("about")}
          >
            О нас
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/"
            state={{ scrollTo: "how-it-works" }}
            onClick={handleLinkClick("how-it-works")}
          >
            Как это работает
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/"
            state={{ scrollTo: "reviews" }}
            onClick={handleLinkClick("reviews")}
          >
            Отзывы
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/"
            state={{ scrollTo: "footer" }}
            onClick={handleLinkClick("footer")}
          >
            Контакты
          </Link>
        </li>
      </ul>
    </nav>
  );
}
