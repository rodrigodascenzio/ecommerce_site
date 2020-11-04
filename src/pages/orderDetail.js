import React from "react";
import { HeaderContainer } from "../containers/header";
import { OrderDetailContainer } from "../containers/orderDetail";
import { FooterContainer } from "../containers/footer";
import { Wrapper } from "../components";

export default function OrderDetail() {
  return (
    <Wrapper>
      <HeaderContainer />
      <OrderDetailContainer />
      <FooterContainer />
    </Wrapper>
  );
}
