import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { TgProvider } from "./context/tgContext";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TgProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TgProvider>
  </StrictMode>
);
