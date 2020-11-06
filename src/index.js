import React from "react";
import { render } from "react-dom";
import "normalize.css";
import { GlobalStyles } from "./global-styles";
import { App } from "./app";
import Store from "./store/Store";
import { ThemeProvider } from "styled-components";

const theme = {
  primary: "radial-gradient(circle, rgba(92, 39, 251, 1) 0%, rgba(112, 71, 247, 1) 100%)",
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
