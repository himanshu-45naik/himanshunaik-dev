// Entry point: the first JavaScript file the browser runs.
// It finds <div id="root"> in index.html and tells React to draw <App /> inside it.
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
