import React from "react";
import { HeaderContainer } from "../containers/header";
import { FooterContainer } from "../containers/footer";
import { ConfirmCodeContainer } from "../containers/confirmCode";
import { Wrapper } from "../components";

export default function ConfirmCode() {
  return (
    <Wrapper>
      <HeaderContainer isInLoginProcess={true} />
      <ConfirmCodeContainer />
      <FooterContainer />
    </Wrapper>
  );
}
