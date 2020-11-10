import React, { useContext } from "react";
import { Footer } from "../components";
import { FaFacebook, FaYoutube, FaTwitter, FaInstagram } from "react-icons/fa";
import { Context } from "../store/Store";

export function FooterContainer() {
  const { state } = useContext(Context);
  const { host } = state;

  return (
    <Footer>
      <Footer.Wrapper>
        <Footer.Row style={{ justifyContent: "space-between" }}>
          {/* <Footer.Column>
            <Footer.Title>Sobre</Footer.Title>
            <Footer.Row>
              <Footer.Link href="/about#schedule">Horários</Footer.Link>
              <Footer.Link href="/about#payments">Pagamentos</Footer.Link>
              <Footer.Link href="/about#address">Endereço</Footer.Link>
              <Footer.Link href="/terms">Termos</Footer.Link>
            </Footer.Row>
          </Footer.Column> */}
          <Footer.Column>
            <Footer.Title>Redes Sociais</Footer.Title>
            <Footer.Row>
              {host.company.facebook && (
                <Footer.Link href={`https://facebook.com/${host.company.facebook}`}>
                  <FaFacebook size="24" />
                </Footer.Link>
              )}
              {host.company.instagram && (
                <Footer.Link href={`https://instagram.com/${host.company.instagram}`}>
                  <FaInstagram size="24" />
                </Footer.Link>
              )}
              {host.company.youtube && (
                <Footer.Link href={`https://youtube.com/${host.company.youtube}`}>
                  <FaYoutube size="24" />
                </Footer.Link>
              )}
              {host.company.twitter && (
                <Footer.Link href={`https://twitter.com/${host.company.twitter}`}>
                  <FaTwitter size="24" />
                </Footer.Link>
              )}
            </Footer.Row>
          </Footer.Column>
          <Footer.Column>
            <Footer.Text>{`${host.company.name}. Todos os direitos reservados - 2020`}</Footer.Text>
          </Footer.Column>
        </Footer.Row>
        {/* <Footer.Row>
          <Footer.Column>
            <Footer.Text>{`${host.company.name}. Todos os direitos reservados - 2020`}</Footer.Text>
          </Footer.Column>
        </Footer.Row> */}
      </Footer.Wrapper>
    </Footer>
  );
}
