import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import StateContext from './StateContext';
import HomePage from "./pages/homePage";
import TicketsPage from "./pages/ticketsPage/TicketsPage";
import "./App.css";
import Footer from "./components/footer/Footer";
import SwitchStyles from "./components/bookingSteps/ticketsDetails/switchStyles";

export default function App() {
  const [globalState, setGlobalState] = useState({});
  console.log(import.meta.env.VITE_PUBLIC_URL);
  return (
    <StateContext.Provider value={{ state: globalState, setState: setGlobalState }}>
      <Router basename={import.meta.env.VITE_PUBLIC_URL}>
        <SwitchStyles />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tickets" element={<TicketsPage />} />
        </Routes>
        <Footer />
      </Router>
    </StateContext.Provider>
  );
}
