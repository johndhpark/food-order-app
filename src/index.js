import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import "./index.css";
import { CartContextProvider } from "./contexts/cart-context";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <CartContextProvider>
    <App />
  </CartContextProvider>
);
