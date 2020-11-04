import React from "react";
import { Container, Card } from "./styles/order";

export default function Orders({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

Orders.Card = function OrdersCard({ children, ...restProps }) {
  return <Card {...restProps}>{children}</Card>;
};
