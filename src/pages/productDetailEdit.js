import React from "react";
import { HeaderContainer } from "../containers/header";
import { FooterContainer } from "../containers/footer";
import { ProductDetailEditContainer } from "../containers/producDetails";
import { Wrapper } from "../components";

export default function ProductDetails() {
  return (
    <Wrapper>
      <HeaderContainer />
      <ProductDetailEditContainer />
      <FooterContainer />
    </Wrapper>
  );
}
