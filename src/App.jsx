import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";
import HomePage from "./pages/homePage";
import TicketsPage from "./pages/ticketsPage/TicketsPage";
import SuccessPage from "./pages/successPage";
import Page404 from "./pages/page404";
import Footer from "./components/footer/Footer";
import { store } from "./redux/store";
import SnackbarComponent from "./components/snackbar/SnackbarComponent";

export default function App() {
  console.log(import.meta.env.VITE_PUBLIC_URL);
  return (
    <Provider store={store}>
      <Router basename={import.meta.env.VITE_PUBLIC_URL}>
        {/* <SwitchStyles /> */}
        <SnackbarComponent />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tickets" element={<TicketsPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/404" element={<Page404 />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}
