import React from "react";
import { Container, Card, Img, Text } from "./styles/notFound";

export default function NotFound({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

NotFound.Card = function NotFoundCard({ children, ...restProps }) {
  return <Card {...restProps}>{children}</Card>;
};

NotFound.Img = function NotFoundImg({ children, ...restProps }) {
  return <Img {...restProps}>{children}</Img>;
};

NotFound.Text = function NotFoundText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>;
};
