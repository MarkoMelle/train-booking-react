import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import StateContext from "./StateContext";
import HomePage from "./pages/homePage";
import TicketsPage from "./pages/ticketsPage/TicketsPage";
import SuccessPage from "./pages/successPage";
import "./App.css";
import Footer from "./components/footer/Footer";
import SwitchStyles from "./components/bookingSteps/ticketsDetails/switchStyles";
import { initialState } from "./tempoDate";

export default function App() {
  const [globalState, setGlobalState] = useState({ ...initialState });
  console.log(import.meta.env.VITE_PUBLIC_URL);
  return (
    <StateContext.Provider
      value={{ state: globalState, setState: setGlobalState }}
    >
      <Router basename={import.meta.env.VITE_PUBLIC_URL}>
        <SwitchStyles />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tickets" element={<TicketsPage />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
        <Footer />
      </Router>
    </StateContext.Provider>
  );
}
