import React, { useContext } from "react";
import { Header } from "../components";
import * as ROUTES from "../constants/routes";
import { Context } from "../store/Store";
import { useHistory } from "react-router-dom";

export function HeaderContainer({ isInLoginProcess, children }) {
  const { state } = useContext(Context);
  const { user, host } = state;
  const history = useHistory();

  function handleClickCart() {
    history.push(ROUTES.CART);
  }

  function handleClickOrders() {
    history.push(ROUTES.ORDERS);
  }

  function handleClickProfile() {
    history.push(ROUTES.PROFILE);
  }

  return (
    <Header src={host.company.banner_photo ? host.company.banner_photo : ""}>
      <Header.Frame>
        <Header.Group>
          <Header.Logo to={ROUTES.HOME} src={host.company.photo} alt={host.company.name} />
        </Header.Group>
        <Header.Group>
          {user ? (
            <>
              <Header.OrderIcon
                size="24"
                onClick={handleClickOrders}
                nav={document.location.pathname === ROUTES.ORDERS}
              />
              <Header.CartIcon size="24" onClick={handleClickCart} nav={document.location.pathname === ROUTES.CART} />

              <Header.Profile onClick={handleClickProfile}>
                <Header.Picture src={user.photo} nav={document.location.pathname === ROUTES.PROFILE} />
              </Header.Profile>
            </>
          ) : !isInLoginProcess ? (
            <Header.ButtonLink to={ROUTES.SIGN_IN}>Entrar</Header.ButtonLink>
          ) : (
            ""
          )}
        </Header.Group>
      </Header.Frame>
      {children}
    </Header>
  );
}
