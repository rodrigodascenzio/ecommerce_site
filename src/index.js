import React from "react";
import { render } from "react-dom";
import "normalize.css";
import { GlobalStyles } from "./global-styles";
import { App } from "./app";
import Store from "./store/Store";

render(
  <React.StrictMode>
    <GlobalStyles />
    <Store>
      <App />
    </Store>
  </React.StrictMode>,
  document.getElementById("root")
);
