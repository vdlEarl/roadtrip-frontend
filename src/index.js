import React from "react";
import ReactDOM from "react-dom/client";
import App from "./router/App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import { TripProvider } from "./component/context/TripContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <TripProvider>
        <App />
      </TripProvider>
    </Router>
  </React.StrictMode>
);


reportWebVitals();
