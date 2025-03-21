import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthcontextProvider } from "./context/Authcontext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthcontextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthcontextProvider>
);
