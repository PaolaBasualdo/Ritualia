import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CuponDescuentoProviderWrapper } from "./contexts/cuponDescuento.context.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CuponDescuentoProviderWrapper>
        <App />
      </CuponDescuentoProviderWrapper>
    </BrowserRouter>
  </StrictMode>,
);
