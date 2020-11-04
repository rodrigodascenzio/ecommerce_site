import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Order, Loading, Cart } from "../components";
import { ORDER_DETAIL } from "../constants/apiRoutes";
import useSWR from "swr";
import { Context } from "../store/Store";
import { mMoney } from "../utils/masks";

export function OrderDetailContainer() {
  const history = useHistory();
  const [ord] = useState({ ...history.location.state });
  const { state } = useContext(Context);
  const { user } = state;
  const { data } = useSWR(`${ORDER_DETAIL}/${user.user_id},${ord.id},-22.872648599999998,-46.9611568,BR`);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!data) return <Loading />;

  console.log(data);

  const products = data.order.item;
  const order = data.order;

  console.log("aaaaaaaaa", products);
  console.log("bbbbbbbbb", order);

  async function handleRating() {}

  async function handleCanceling() {}

  return (
    <Cart>
      <Cart.Card>
        <Cart.Products>
          <>
            <Cart.SubTitle>Detalhe do Pedido</Cart.SubTitle>
            {products.map((p) => (
              <Cart.Product style={{ cursor: "default" }}>
                <Cart.Quantity minsize="10" fontsize="16">
                  {p.quantity}
                </Cart.Quantity>
                <Cart.NameContainer>
                  <Cart.Name>{p.name}</Cart.Name>
                  {p.size_name && <Cart.Size>Tamanho: {p.size_name}</Cart.Size>}
                  {p.extra?.map((e) => (
                    <Cart.SubGroup>
                      <Cart.Quantity>{e.quantity}</Cart.Quantity>
                      <Cart.Extras>{e.name}</Cart.Extras>
                    </Cart.SubGroup>
                  ))}
                </Cart.NameContainer>
                <Cart.Price>{mMoney(p.total_amount)}</Cart.Price>
              </Cart.Product>
            ))}
          </>
        </Cart.Products>

        <Cart.Products>
          {order.type === "delivery" && <Cart.Text>Será entregue em:</Cart.Text>}
          {order.type === "local" && <Cart.Text>Deve ser retirado em:</Cart.Text>}

          <Cart.Text>{order.address}</Cart.Text>
        </Cart.Products>

        <Cart.Products>
          <Cart.SubTitle>Resumo</Cart.SubTitle>
          <Cart.SubGroup column={true}>
            <Cart.SubGroup>
              <Cart.Text>Subtotal</Cart.Text>
              <Cart.Price>{mMoney(order.subtotal_amount)}</Cart.Price>
            </Cart.SubGroup>
            {order.type === "delivery" && (
              <Cart.SubGroup>
                <Cart.Text>Entrega</Cart.Text>
                <Cart.Price>{order.delivery_amount < 1 ? "Grátis" : mMoney(order.delivery_amount)}</Cart.Price>
              </Cart.SubGroup>
            )}
            {order.coupon_id && (
              <Cart.SubGroup>
                <Cart.SubGroup style={{ alignItems: "center" }}>
                  <Cart.Text>Desconto</Cart.Text>
                </Cart.SubGroup>

                <Cart.SubGroup>
                  <Cart.Price>{mMoney(order.subtotal_amount)}</Cart.Price>
                </Cart.SubGroup>
              </Cart.SubGroup>
            )}

            <Cart.SubGroup>
              <Cart.Text>Pagamento</Cart.Text>
              <Cart.Price>{`${order.type === "delivery" ? "Na entrega" : "Na retirada"} - ${
                order.payment_method
              }`}</Cart.Price>
            </Cart.SubGroup>

            <Cart.SubGroup>
              <Cart.Text style={{ fontWeight: "bold", fontSize: "16px" }}>Total</Cart.Text>
              <Cart.Price style={{ fontWeight: "bold", fontSize: "16px" }}>{mMoney(order.total_amount)}</Cart.Price>
            </Cart.SubGroup>
          </Cart.SubGroup>
        </Cart.Products>

        {order.status.includes("concluded") && !order.rating && (
          <Cart.Button onClick={handleRating}>{processing ? "Processando..." : " Avaliar pedido"}</Cart.Button>
        )}
        {order.status.includes("pending") && (
          <Cart.Button onClick={handleCanceling}>{processing ? "Processando..." : " Cancelar pedido"}</Cart.Button>
        )}
      </Cart.Card>
    </Cart>
  );
}
