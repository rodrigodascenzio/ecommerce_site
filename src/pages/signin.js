import React from "react";
import { HeaderContainer } from "../containers/header";
import { FooterContainer } from "../containers/footer";
import { SignInContainer } from "../containers/signin";
import { Wrapper } from "../components";

export default function SignIn() {
  return (
    <Wrapper>
      <HeaderContainer isInLoginProcess={true} />
      <SignInContainer />
      <FooterContainer />
    </Wrapper>
  );
}
