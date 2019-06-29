import React from "react";

import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./Stylesheets/index.css";
import App from "./App/App";
import Store from "./App/MyStore";

render(
  <Store.Container>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Store.Container>,
  document.getElementById("root")
);
