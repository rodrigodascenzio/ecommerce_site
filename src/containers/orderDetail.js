import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Loading, Cart } from "../components";
import { ORDER_DETAIL, CANCEL_ORDER, RATING_ORDER } from "../constants/apiRoutes";
import useSWR from "swr";
import { Context } from "../store/Store";
import { mMoney } from "../utils/masks";
import axios from "../utils/axios";
import { FaMotorcycle } from "react-icons/fa";
import { BiStore } from "react-icons/bi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdDoneAll } from "react-icons/io";
import { BsFillInboxesFill } from "react-icons/bs";
import { FcCancel } from "react-icons/fc";

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

  const item = data.order.item;
  const order = data.order;

  function handleCanceling() {
    setProcessing(true);
    axios
      .patch(CANCEL_ORDER, {
        status: "canceled_user",
        order_id: order.order_id,
        user_id: order.user_id,
        company_id: order.company_id,
      })
      .then((res) => {
        console.log(res.data);
        setProcessing(false);
      })
      .catch((e) => {
        console.log(e);
        setProcessing(false);
      });
  }

  function returnStatus(status) {
    switch (status) {
      case "pending":
        return (
          <>
            <AiOutlineLoading3Quarters style={{ margin: "0 20px 0 10px" }} />
            <Cart.Name>Aguardando confirmação</Cart.Name>
          </>
        );
      case "canceled_user":
      case "canceled_company":
        return (
          <>
            <FcCancel style={{ margin: "0 20px 0 10px" }} />
            <Cart.Name>Pedido Cancelado</Cart.Name>
          </>
        );
      case "concluded_not_rated":
      case "concluded":
        return (
          <>
            <IoMdDoneAll style={{ margin: "0 20px 0 10px" }} />
            <Cart.Name>Pedido Concluido</Cart.Name>
          </>
        );
      case "delivery":
        return (
          <>
            <FaMotorcycle style={{ margin: "0 20px 0 10px" }} />
            <Cart.Name>Pedido saiu para entrega</Cart.Name>
          </>
        );
      case "local":
        return (
          <>
            <BiStore style={{ margin: "0 20px 0 10px" }} />
            <Cart.Name>Liberado para retirada</Cart.Name>
          </>
        );
      case "accepted":
        return (
          <>
            <BsFillInboxesFill style={{ margin: "0 20px 0 10px" }} />
            <Cart.Name>Pedido aceito</Cart.Name>
          </>
        );
    }
  }

  return (
    <Cart>
      <Cart.Card>
        <Cart.Products style={{ alignItems: "center", padding: "20px" }}>
          <>
            <Cart.SubTitle>Status do Pedido</Cart.SubTitle>
            <Cart.Product
              style={{
                cursor: "default",
                alignItems: "center",
                padding: "20px",
                margin: "20px",
                border: "2px solid #222",
                borderRadius: "5px",
              }}
            >
              {returnStatus(order.status)}
            </Cart.Product>
          </>
        </Cart.Products>

        <Cart.Products>
          <>
            <Cart.SubTitle>Detalhes</Cart.SubTitle>
            {item.map((p) => (
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
        {/* 
        {order.status.includes("concluded") && !order.rating && (
          <Cart.Button onClick={handleRating}>{processing ? "Processando..." : " Avaliar pedido"}</Cart.Button>
        )} */}
        {order.status.includes("pending") && (
          <Cart.Button onClick={handleCanceling}>{processing ? "Processando..." : " Cancelar pedido"}</Cart.Button>
        )}
      </Cart.Card>
    </Cart>
  );
}
