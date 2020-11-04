import React from "react";
import { HeaderContainer } from "../containers/header";
import { FooterContainer } from "../containers/footer";
import { OrdersContainer } from "../containers/orders";
import { Wrapper } from "../components";

export default function Orders() {
  return (
    <Wrapper>
      <HeaderContainer />
      <OrdersContainer />
      <FooterContainer />
    </Wrapper>
  );
}
