import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import TicketsPage from "./pages/ticketsPage/TicketsPage";
import "./App.css";
import Footer from "./components/footer/Footer";
import SwitchStyles from "./components/bookingSteps/ticketsDetails/switchStyles";

export default function App() {
  console.log(import.meta.env.VITE_PUBLIC_URL);
  return (
    <Router basename={import.meta.env.VITE_PUBLIC_URL}>
      <SwitchStyles />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tickets" element={<TicketsPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}
