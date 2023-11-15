import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import HomePage from "./pages/homePage";
import TicketsPage from "./pages/ticketsPage/TicketsPage";
import SuccessPage from "./pages/successPage";
import "./App.css";
import Footer from "./components/footer/Footer";
import SwitchStyles from "./components/bookingSteps/ticketsDetails/switchStyles";
import { store } from "./redux/store";

export default function App() {
  console.log(import.meta.env.VITE_PUBLIC_URL);
  return (
    <Provider store={store}>
      <Router basename={import.meta.env.VITE_PUBLIC_URL}>
        <SwitchStyles />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tickets" element={<TicketsPage />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}
