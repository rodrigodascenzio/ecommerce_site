import React, { useState, useEffect, useContext } from "react";
import Fuse from "fuse.js";
import { Card, Header, Loading, Wrapper, NotFound } from "../components";
import { Context } from "../store/Store";
import * as ROUTES from "../constants/routes";
import { useHistory } from "react-router-dom";
import { COMPANY_PRODUCTS } from "../constants/apiRoutes";
import useSWR from "swr";
import { FooterContainer } from "../containers/footer";
import { mMoney } from "../utils/masks";

export function BrowseContainer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setproducts] = useState([]);
  const history = useHistory();
  const { state } = useContext(Context);
  const { user, host } = state;
  const { data } = useSWR(`${COMPANY_PRODUCTS}/${host.company.company_id}`);

  console.log(state);

  useEffect(() => {
    setproducts(data?.product);
  }, [data]);

  useEffect(() => {
    const fuse = new Fuse(products, {
      keys: ["description", "name", "price"],
    });
    const results = fuse.search(searchTerm).map(({ item }) => item);

    if (products.length > 0 && searchTerm.length > 3 && results.length > 0) {
      setproducts(results);
    } else {
      if (data) {
        setproducts(data.product);
      }
    }
  }, [searchTerm]);

  const handleClick = (e) => {
    e.preventDefault();
    history.push(ROUTES.PRODUCT_DETAIL, { id: e.currentTarget.id });
  };

  function handleClickCart() {
    history.push(ROUTES.CART);
  }

  function handleClickOrders() {
    history.push(ROUTES.ORDERS);
  }

  function handleClickProfile() {
    history.push(ROUTES.PROFILE);
  }

  if (!data) return <Loading />;

  if (!data.product.length) {
    return (
      <Card>
        <Card.Group>
          <NotFound>
            <NotFound.Card>
              <NotFound.Img src={require("../images/misc/error.svg")} />
              <NotFound.Text>Em manutenção</NotFound.Text>
            </NotFound.Card>
          </NotFound>
        </Card.Group>
      </Card>
    );
  }

  return (
    <Wrapper>
      <Header src={host.company.banner_photo ? host.company.banner_photo : ""}>
        <Header.Frame>
          <Header.Group>
            <Header.Logo to={ROUTES.HOME} src={host.company.photo} alt={host.company.name} />
          </Header.Group>
          <Header.Group>
            <Header.Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            {user ? (
              <>
                <Header.OrderIcon size="24" onClick={handleClickOrders} />
                <Header.CartIcon size="24" onClick={handleClickCart} />
                <Header.Profile onClick={handleClickProfile}>
                  <Header.Picture src={user.photo} />
                </Header.Profile>
              </>
            ) : (
              <Header.ButtonLink style={{ "margin-left": "20px" }} to={ROUTES.SIGN_IN}>
                Entrar
              </Header.ButtonLink>
            )}
          </Header.Group>
        </Header.Frame>
      </Header>
      <Card>
        <Card.Group>
          <Card.Title>{host?.company.category_company_id === "1" ? "Cardápio" : "Produtos"}</Card.Title>
          <Card.Entities>
            {products?.map((item) => (
              <Card.Item id={item.product_id} key={item.product_id} item={item} onClick={handleClick}>
                <Card.Image src={item.photo} />
                <Card.Meta>
                  <Card.SubTitle>{item.name}</Card.SubTitle>
                  <Card.Text>{item.description}</Card.Text>
                  <Card.Price>{mMoney(item.price)}</Card.Price>
                </Card.Meta>
              </Card.Item>
            ))}
          </Card.Entities>
        </Card.Group>
      </Card>
      <FooterContainer />
    </Wrapper>
  );
}
