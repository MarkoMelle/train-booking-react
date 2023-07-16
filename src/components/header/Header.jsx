import Navbar from "./navbar/Navbar";
import { useLocation } from "react-router-dom";
import SelectionForm from "./selectionForm/SelectionForm";
import "./Header.css";

export default function Header() {
  const location = useLocation();
  let background;
  // let Widget;

  switch (location.pathname) {
    case "/":
      background = "home-background";
      // Widget = "Filter-home";
      break;
    case "/....":
      background = "about-background";
      // Widget = "WidgetAbout";
      break;
    case "/.....":
      background = "contact-background";
      // Widget = "Filter-full";
      break;
    default:
      background = "";
      // Widget = null;
  }

  return (
    <header className={`header wrapper ${background}`}>
      <Navbar />
      <div className="header__content">
        <h2 className="header__title">
          <span className="header__title--light">Вся жизнь -</span>
          <span className="header__title--bold">путешествие!</span>
        </h2>
        <SelectionForm />
      </div>
    </header>
  );
}
