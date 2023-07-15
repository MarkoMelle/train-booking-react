import Navbar from "./navbar/Navbar";
import { useLocation } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const location = useLocation();
  let background, Widget;

  switch (location.pathname) {
    case "/":
      background = "home-background";
      Widget = "Filter-home";
      break;
    case "/....":
      background = "about-background";
      Widget = "WidgetAbout";
      break;
    case "/.....":
      background = "contact-background";
      Widget = "Filter-full";
      break;
    default:
      background = "";
      Widget = null;
  }

  return (
    <header className={`header wrapper ${background}`}>
      <>{Widget && <Widget />}</>
      <Navbar />
    </header>
  );
}
