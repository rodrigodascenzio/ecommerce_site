import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Orders, Loading } from "../components";
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
    `${ORDERS}/${user.user_id},${host.company.company_id},${host.company.category_company_id},-22.872648599999998,-46.9611568,BR`
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
          <Orders.Title>Ainda não houve pedido</Orders.Title>
        </Orders.Card>
      </Orders>
    );
  }

  return (
    <Orders>
      <Orders.Card>
        <Orders.Title>Pedidos</Orders.Title>
        <Orders.Group>
          {data.order.map((item) => (
            <Orders.Item onClick={(e) => handleClickItem(item.order_id)}>
              <div>
                <Orders.SubText>Data</Orders.SubText>
                <Orders.Text>{item.created_date}</Orders.Text>
              </div>
              <div>
                <Orders.SubText>Nº Pedido</Orders.SubText>
                <Orders.Text>{item.order_id}</Orders.Text>
              </div>
              <div>
                <Orders.SubText>Status</Orders.SubText>
                <Orders.Text>{item.status}</Orders.Text>
              </div>
              <div>
                <Orders.SubText>Total</Orders.SubText>
                <Orders.Text>{mMoney(item.total_amount)}</Orders.Text>
              </div>
            </Orders.Item>
          ))}
        </Orders.Group>
      </Orders.Card>
    </Orders>
  );
}
