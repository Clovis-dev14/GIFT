import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QRPage from "./QRPage";
import App from "./App";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<QRPage />} />
          <Route path="/surprise" element={<App />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
}