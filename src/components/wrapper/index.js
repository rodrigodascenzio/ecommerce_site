import React from "react";
import { Container } from "./styles/wrapper";

export default function Feature({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}
