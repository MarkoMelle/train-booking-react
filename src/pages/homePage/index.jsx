import Header from "../../components/header/Header";
import About from "./about/About";
import HowItWorks from "./howItWorks/HowItWorks";
import Reviews from "./reviews/Reviews";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { handleScroll } from "../../utils";

export default function HomePage() {
  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      handleScroll(location.state.scrollTo);
    }
  }, [location.state]);

  return (
    <>
      <Header />
      <About />
      <HowItWorks />
      <Reviews />
    </>
  );
}
