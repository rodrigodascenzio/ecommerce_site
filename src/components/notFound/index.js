import React from "react";
import { Container, Card } from "./styles/notFound";

export default function NotFound({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

NotFound.Card = function NotFoundCard({ children, ...restProps }) {
  return <Card {...restProps}>{children}</Card>;
};
