import React, { useState } from "react";
import { Link as ReachRouterLink } from "react-router-dom";
import {
  Container,
  Group,
  Dropdown,
  Picture,
  Link,
  Search,
  Profile,
  FeatureCallOut,
  SearchIcon,
  SearchInput,
  ButtonLink,
  PlayButton,
  Text,
  FeatureBlur,
  Feature,
  Logo,
  CartIcon,
  OrderIcon,
  PersonIcon,
  Background,
} from "./styles/header";

export default function Header({ bg = true, children, ...restProps }) {
  return bg ? (
    <Background data-testid="" {...restProps}>
      {children}
    </Background>
  ) : (
    children
  );
}

Header.Frame = function HeaderFrame({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
};

Header.Group = function HeaderGroup({ children, ...restProps }) {
  return <Group {...restProps}>{children}</Group>;
};

Header.Logo = function HeaderLogo({ to, ...restProps }) {
  return (
    <ReachRouterLink to={to}>
      <Logo {...restProps} />
    </ReachRouterLink>
  );
};

Header.Search = function HeaderSearch({ searchTerm, setSearchTerm, ...restProps }) {
  const [searchActive, setSearchActive] = useState(false);

  return (
    <Search {...restProps}>
      <SearchIcon size="24" onClick={() => setSearchActive((searchActive) => !searchActive)} />
      <SearchInput
        value={searchTerm}
        onChange={({ target }) => setSearchTerm(target.value)}
        placeholder="Procurar por..."
        active={searchActive}
      />
    </Search>
  );
};

Header.Profile = function HeaderProfile({ children, ...restProps }) {
  return <Profile {...restProps}>{children}</Profile>;
};

Header.FeatureBlur = function HeaderFeatureBlur({ children, ...restProps }) {
  return <FeatureBlur>{children}</FeatureBlur>;
};

Header.Feature = function HeaderFeature({ children, ...restProps }) {
  return <Feature>{children}</Feature>;
};

Header.Picture = function HeaderPicture({ ...restProps }) {
  if (!restProps.src) {
    return <PersonIcon size="24" {...restProps} />;
  }
  return <Picture {...restProps} />;
};

Header.OrderIcon = function HeadeOrderIcon({ ...restProps }) {
  return <OrderIcon {...restProps} />;
};

Header.CartIcon = function HeaderCartIcon({ ...restProps }) {
  return <CartIcon {...restProps} />;
};

Header.PersonIcon = function HeaderPersonIcon({ ...restProps }) {
  return <PersonIcon {...restProps} />;
};

Header.Dropdown = function HeaderDropdown({ children, ...restProps }) {
  return <Dropdown {...restProps}>{children}</Dropdown>;
};

Header.TextLink = function HeaderTextLink({ children, ...restProps }) {
  return <Link {...restProps}>{children}</Link>;
};

Header.PlayButton = function HeaderPlayButton({ children, ...restProps }) {
  return <PlayButton {...restProps}>{children}</PlayButton>;
};

Header.FeatureCallOut = function HeaderFeatureCallOut({ children, ...restProps }) {
  return <FeatureCallOut {...restProps}>{children}</FeatureCallOut>;
};

Header.Text = function HeaderText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>;
};

Header.ButtonLink = function HeaderButtonLink({ children, ...restProps }) {
  return <ButtonLink {...restProps}>{children}</ButtonLink>;
};
