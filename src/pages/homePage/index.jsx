import Header from "../../components/header/Header";
import About from "./about/About";
import HowItWorks from "./howItWorks/HowItWorks";
import Reviews from "./reviews/Reviews";

export default function HomePage() {
  return (
    <>
      <Header />
      <About />
      <HowItWorks />
      <Reviews />
    </>
  );
}
