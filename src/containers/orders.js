import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Orders, Loading, NotFound } from "../components";
import { ORDERS } from "../constants/apiRoutes";
import * as ROUTES from "../constants/routes";
import useSWR from "swr";
import { Context } from "../store/Store";
import { mMoney } from "../utils/masks";

export function OrdersContainer() {
  const history = useHistory();
  const { state } = useContext(Context);
  const { user, host } = state;

  const { data } = useSWR(
    `${ORDERS}/${user.id},${host.company.id},${host.company.category_company_id},-22.872648599999998,-46.9611568,BR`
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!data) return <Loading />;

  function handleClickItem(itemId) {
    history.push(ROUTES.ORDER_DETAIL, { id: itemId });
  }

  console.log(data);

  if (data.order.length < 1) {
    return (
      <Orders>
        <Orders.Card>
          <NotFound>
            <NotFound.Card>
              <NotFound.Img src={require("../images/misc/error.svg")} />
              <NotFound.Text>Ainda não houve pedido</NotFound.Text>
            </NotFound.Card>
          </NotFound>
        </Orders.Card>
      </Orders>
    );
  }

  function returnStatus(status) {
    switch (status) {
      case "pending":
        return <Orders.Text>Aguardando confirmação</Orders.Text>;
      case "canceled_user":
      case "canceled_company":
        return <Orders.Text>Pedido Cancelado</Orders.Text>;
      case "concluded_not_rated":
      case "concluded":
        return <Orders.Text>Pedido Concluido</Orders.Text>;
      case "delivery":
        return <Orders.Text>Pedido saiu para entrega</Orders.Text>;
      case "local":
        return <Orders.Text>Liberado para retirada</Orders.Text>;
      case "accepted":
        return <Orders.Text>Pedido aceito</Orders.Text>;
    }
  }

  function splitDate(date) {
    const newDate = date.split("-");
    return `${newDate[2]}/${newDate[1]}/${newDate[0]}`;
  }

  return (
    <Orders>
      <Orders.Card>
        <Orders.Title>Pedidos</Orders.Title>
        <Orders.Group>
          {data.order.map((item) => (
            <Orders.Item onClick={(e) => handleClickItem(item.id)}>
              <Orders.InnerItem>
                <Orders.SubText>Data</Orders.SubText>
                <Orders.Text>{splitDate(item.created_date)}</Orders.Text>
              </Orders.InnerItem>
              <Orders.InnerItem>
                <Orders.SubText>Nº Pedido</Orders.SubText>
                <Orders.Text>{item.id}</Orders.Text>
              </Orders.InnerItem>
              <Orders.InnerItem style={{ width: "20%" }}>
                <Orders.SubText>Status</Orders.SubText>
                {returnStatus(item.status)}
              </Orders.InnerItem>
              <Orders.InnerItem style={{ minWidth: "10%" }}>
                <Orders.SubText>Total</Orders.SubText>
                <Orders.Text>{mMoney(item.total_amount)}</Orders.Text>
              </Orders.InnerItem>
            </Orders.Item>
          ))}
        </Orders.Group>
      </Orders.Card>
    </Orders>
  );
}
