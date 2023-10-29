import Navbar from "./navbar/Navbar";
import { useLocation } from "react-router-dom";
import SelectionForm from "./selectionForm/SelectionForm";
import "./Header.css";

export default function Header() {
  const location = useLocation();
  let modifier;

  switch (location.pathname) {
    case "/":
      modifier = "home";
      break;
    case "/tickets":
      modifier = "tickets";
      break;
    case "/success":
      modifier = "success";
      break;
    default:
      modifier = "";
  }

  return (
    <header
      id="header"
      className={`header wrapper ${"header--bg--" + modifier}`}
    >
      <Navbar />
      <div
        className={`header__content header__content--${
          modifier === "home" ? "" : modifier
        }`}
      >
        {modifier === "home" ? (
          <h2 className="header__title">
            <span className="header__title--light">Вся жизнь -</span>
            <span className="header__title--bold">путешествие!</span>
          </h2>
        ) : null}
        {modifier !== "success" ? <SelectionForm modifier={modifier} /> : null}
      </div>
    </header>
  );
}
