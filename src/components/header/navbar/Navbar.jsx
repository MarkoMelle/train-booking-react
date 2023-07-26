import { Link } from "react-router-dom";
import "./Navbar.css";
import { handleScroll } from "../../../utils";

export default function Navbar() {
  return (
    <nav className="nav">
      <ul className="nav-list nav-list">
        <li className="nav-item nav-item-logo">
          <Link to="/">Лого</Link>
        </li>
        <li className="nav-item">
          <Link to="/" onClick={() => handleScroll("about")}>
            О нас
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/" onClick={() => handleScroll("how-it-works")}>
            Как это работает
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/" onClick={() => handleScroll("reviews")}>
            Отзывы
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/"
            onClick={(e) => {
              e.preventDefault();
              handleScroll("contact");
            }}
          >
            Контакты
          </Link>
        </li>
      </ul>
    </nav>
  );
}
