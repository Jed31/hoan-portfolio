import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <Router basename={import.meta.env.BASE_URL}>
    <Routes>
      <Route path="/*" element={<App />} />
    </Routes>
  </Router>
);
