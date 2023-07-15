import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./App.css";

export default function App() {
  console.log(import.meta.env.VITE_PUBLIC_URL);
  return (
    <Router basename={import.meta.env.VITE_PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}
