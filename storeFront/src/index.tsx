import React from "react";
import ReactDOM from "react-dom/client";
//import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap-icons/font/bootstrap-icons.css";

import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "./context/store.context";
import AppLogout from "./components/AppLogout";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <StoreProvider>
      <AppLogout>
        <App />
      </AppLogout>
    </StoreProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
