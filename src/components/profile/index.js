import React from "react";
import {
  Container,
  Title,
  List,
  Item,
  Picture,
  Name,
  Card,
  Group,
  Content,
  Form,
  Base,
  Input,
  Submit,
  EditIcon,
  Div,
  Logout,
} from "./styles/profile";

export default function profile({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

profile.Title = function profileTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

profile.List = function profileList({ children, ...restProps }) {
  return <List {...restProps}>{children}</List>;
};

profile.User = function profileUser({ children, ...restProps }) {
  return <Item {...restProps}>{children}</Item>;
};

profile.Picture = function profilePicture({ src, ...restProps }) {
  return <Picture {...restProps} src={src ? src : ""} />;
};

profile.Name = function profileName({ children, ...restProps }) {
  return <Name {...restProps}>{children}</Name>;
};

profile.Card = function profileCard({ children, ...restProps }) {
  return <Card {...restProps}>{children}</Card>;
};

profile.Group = function profileGroup({ children, ...restProps }) {
  return <Group {...restProps}>{children}</Group>;
};

profile.Content = function profileContent({ children, ...restProps }) {
  return <Content {...restProps}>{children}</Content>;
};

profile.Input = function profileInput({ children, ...restProps }) {
  return <Input {...restProps}>{children}</Input>;
};

profile.Base = function profileBase({ children, ...restProps }) {
  return <Base {...restProps}>{children}</Base>;
};

profile.Form = function profileForm({ children, ...restProps }) {
  return <Form {...restProps}>{children}</Form>;
};

profile.Submit = function profileSubmit({ children, ...restProps }) {
  return <Submit {...restProps}>{children}</Submit>;
};

profile.Logout = function profileLogout({ children, ...restProps }) {
  return <Logout {...restProps}>{children}</Logout>;
};

profile.EditIcon = function profileEditIcon({ children, ...restProps }) {
  return <EditIcon {...restProps}>{children}</EditIcon>;
};

profile.Div = function profileDiv({ children, ...restProps }) {
  return <Div {...restProps}>{children}</Div>;
};
