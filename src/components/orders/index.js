import React from "react";
import { Container, Card, Title, Group, Item, InnerItem, Text, SubText } from "./styles/orders";

export default function Orders({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

Orders.Card = function OrdersCard({ children, ...restProps }) {
  return <Card {...restProps}>{children}</Card>;
};

Orders.Title = function OrdersTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

Orders.Text = function OrdersText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>;
};

Orders.SubText = function OrdersSubText({ children, ...restProps }) {
  return <SubText {...restProps}>{children}</SubText>;
};

Orders.Group = function OrdersGroup({ children, ...restProps }) {
  return <Group {...restProps}>{children}</Group>;
};

Orders.Item = function OrdersItem({ children, ...restProps }) {
  return <Item {...restProps}>{children}</Item>;
};

Orders.InnerItem = function OrdersInnerItem({ children, ...restProps }) {
  return <InnerItem {...restProps}>{children}</InnerItem>;
};
