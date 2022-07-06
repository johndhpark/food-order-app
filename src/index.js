import { createRoot } from "react-dom/client";
import App from "./components/App";
import { CartProvider } from "./contexts/cart-context";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <CartProvider>
    <App />
  </CartProvider>
);
