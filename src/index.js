import React from "react";
import { render } from "react-dom";
import "normalize.css";
import { GlobalStyles } from "./global-styles";
import { App } from "./app";
import Store from "./store/Store";
import { ThemeProvider } from "styled-components";

const theme = {
  primary_color: "#FF585D",
  second_color: "rgba(112, 71, 247, 1)",
  background_color: "#FF585D",
  background_hover: "radial-gradient(circle, rgba(92, 39, 251, 0.8) 0%, rgba(112, 71, 247, 0.8) 100%)",
};

render(
  <React.StrictMode>
    <GlobalStyles />
    <Store>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Store>
  </React.StrictMode>,
  document.getElementById("root")
);
