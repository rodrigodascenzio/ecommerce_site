import React from "react";
import { HeaderContainer } from "../containers/header";
import { FooterContainer } from "../containers/footer";
import { CartContainer } from "../containers/cart";
import { Wrapper } from "../components";

export default function Cart() {
  return (
    <Wrapper>
      <HeaderContainer />
      <CartContainer />
      <FooterContainer />
    </Wrapper>
  );
}
