import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import "./styles.css";
import TitleBar from "./components/TitleBar";
import LeftNavbar from "./components/LeftNavbar";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <TitleBar/>
    <App />
    <LeftNavbar/>
  </React.StrictMode>,
);
