import Header from "../components/header/Header";
import About from "../components/about/About";
import HowItWorks from "../components/howItWorks/HowItWorks";
import Reviews from "../components/reviews/Reviews";

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
