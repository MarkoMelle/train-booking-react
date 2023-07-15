import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="nav">
      <ul className="nav-list nav-list">
        <li className="nav-item nav-item-logo">
          <Link to="/">
            {/* <img src={logo} alt="logo" /> */}
            Лого
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/about">О нас</Link>
        </li>
        <li className="nav-item">
          <Link to="/how-it-works">Как это работает</Link>
        </li>
        <li className="nav-item">
          <Link to="/reviews">Отзывы</Link>
        </li>
        <li className="nav-item">
          <Link to="/contact">Контакты</Link>
        </li>
      </ul>
    </nav>
  );
}
