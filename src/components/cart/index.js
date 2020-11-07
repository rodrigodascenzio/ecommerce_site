import React from "react";
import {
  Container,
  Card,
  ContentBlock,
  Group,
  SubGroup,
  Title,
  Text,
  Product,
  Products,
  ProductsCollumn,
  SubText,
  Button,
  Input,
  SubTitle,
  Price,
  Size,
  Extras,
  Name,
  NameContainer,
  Quantity,
  DeleteIcon,
} from "./styles/cart";

export default function Cart({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

Cart.Card = function CartCard({ children, ...restProps }) {
  return <Card {...restProps}>{children}</Card>;
};

Cart.Products = function CartProducts({ children, ...restProps }) {
  return <Products {...restProps}>{children}</Products>;
};

Cart.ProductsCollumn = function CartProductsCollumn({ children, ...restProps }) {
  return <ProductsCollumn {...restProps}>{children}</ProductsCollumn>;
};

Cart.Product = function CartProduct({ children, ...restProps }) {
  return <Product {...restProps}>{children}</Product>;
};

Cart.ContentBlock = function CartContentBlock({ children, ...restProps }) {
  return <ContentBlock {...restProps}>{children}</ContentBlock>;
};

Cart.Group = function CartGroup({ children, ...restProps }) {
  return <Group {...restProps}>{children}</Group>;
};

Cart.SubGroup = function CartSubGroup({ children, ...restProps }) {
  return <SubGroup {...restProps}>{children}</SubGroup>;
};

Cart.Title = function CartTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

Cart.Text = function CartText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>;
};

Cart.SubTitle = function CartSubTitle({ children, ...restProps }) {
  return <SubTitle {...restProps}>{children}</SubTitle>;
};

Cart.Price = function CartPrice({ children, ...restProps }) {
  return <Price {...restProps}>{children}</Price>;
};

Cart.SubText = function CartSubText({ children, ...restProps }) {
  return <SubText {...restProps}>{children}</SubText>;
};

Cart.Button = function CartButton({ children, ...restProps }) {
  return <Button {...restProps}>{children}</Button>;
};

Cart.Input = function CartInput({ children, ...restProps }) {
  return <Input {...restProps}>{children}</Input>;
};

Cart.Size = function CartSize({ children, ...restProps }) {
  return <Size {...restProps}>{children}</Size>;
};

Cart.Extras = function CartExtras({ children, ...restProps }) {
  return <Extras {...restProps}>{children}</Extras>;
};

Cart.Name = function CartName({ children, ...restProps }) {
  return <Name {...restProps}>{children}</Name>;
};

Cart.NameContainer = function CartNameContainer({ children, ...restProps }) {
  return <NameContainer {...restProps}>{children}</NameContainer>;
};

Cart.Quantity = function CartQuantity({ children, ...restProps }) {
  return <Quantity {...restProps}>{children}</Quantity>;
};

Cart.DeleteIcon = function CartDeleteIcon({ ...restProps }) {
  return <DeleteIcon {...restProps} />;
};
