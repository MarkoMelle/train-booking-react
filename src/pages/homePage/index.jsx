import Header from "../../components/header/Header";
import About from "../../components/about/About";
import HowItWorks from "../../components/howItWorks/HowItWorks";
import Reviews from "../../components/reviews/Reviews";
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
