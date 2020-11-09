import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  html, body {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: white;
  color: #333333;
  font-size: 16px;
  z-index: 1;
  width: 100%;
  height: 100%;
  max-width: 1600px;
  margin: 0 auto;
  a{
      outline: none;
  }
}`;

// export const Button = styled.button`
//   border-radius: 4px;
//   background: ${({ primary }) => (primary ? "#4B59F7" : "#0467FB")};
//   white-space: nowrap;
//   padding: ${({ big }) => (big ? "12px 64px" : "10px 20px")};
//   color: #fff;
//   font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
//   outline: none;
//   border: none;
//   cursor: pointer;

//   &:hover {
//     transition: all 0.3s ease-out;
//     background: #fff;
//     background-color: ${({ primary }) => (primary ? "#0467FB" : "#4B59F7")};
//   }
// `;
