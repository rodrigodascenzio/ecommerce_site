import React from "react";
import {
  Container,
  Card,
  ContentBlock,
  Photo,
  Group,
  SubGroup,
  Title,
  Text,
  SubText,
  Button,
  Input,
  SubTitle,
  Price,
  PlusIcon,
  MinusIcon,
} from "./styles/product";

export default function Product({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

Product.Photo = function ProductPhoto({ ...restProps }) {
  return <Photo {...restProps} />;
};

Product.Card = function ProductCard({ children, ...restProps }) {
  return <Card {...restProps}>{children}</Card>;
};

Product.ContentBlock = function ProductContentBlock({ children, ...restProps }) {
  return <ContentBlock {...restProps}>{children}</ContentBlock>;
};

Product.Group = function ProductGroup({ children, ...restProps }) {
  return <Group {...restProps}>{children}</Group>;
};

Product.SubGroup = function ProductSubGroup({ children, ...restProps }) {
  return <SubGroup {...restProps}>{children}</SubGroup>;
};

Product.Title = function ProductTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

Product.Text = function ProductText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>;
};

Product.SubTitle = function ProductSubTitle({ children, ...restProps }) {
  return <SubTitle {...restProps}>{children}</SubTitle>;
};

Product.Price = function ProductPrice({ children, ...restProps }) {
  return <Price {...restProps}>{children}</Price>;
};

Product.SubText = function ProductSubText({ children, ...restProps }) {
  return <SubText {...restProps}>{children}</SubText>;
};

Product.Button = function ProductButton({ children, ...restProps }) {
  return <Button {...restProps}>{children}</Button>;
};

Product.Input = function ProductInput({ children, ...restProps }) {
  return <Input {...restProps}>{children}</Input>;
};

Product.PlusIcon = function ProductPlusIcon({ ...restProps }) {
  return <PlusIcon {...restProps} />;
};
Product.MinusIcon = function ProductMinusIcon({ ...restProps }) {
  return <MinusIcon {...restProps} />;
};
