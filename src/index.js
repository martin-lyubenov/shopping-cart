import ReactDOM from "react-dom/client";
import App from "./App.js";
import { CartContextProvider } from "./context/cart-context.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CartContextProvider>
    <App />
  </CartContextProvider>
);
