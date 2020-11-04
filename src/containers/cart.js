import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Cart, Loading } from "../components";
import { CART, CART_INFO, CART_ORDER, CART_COUPON_INFO, CART_DELETE_PRODUCT } from "../constants/apiRoutes";
import * as ROUTES from "../constants/routes";
import useSWR, { mutate, trigger } from "swr";
import { Context } from "../store/Store";
import axios from "../utils/axios";
import { mMoney, roudHalf } from "../utils/masks";
import { ProfileAddressContainer } from "./profileAddress";

export function CartContainer() {
  const history = useHistory();
  const { state } = useContext(Context);
  const { user, host } = state;
  const [processingAddress, setProcessingAddress] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [makingChanges, setmakingChanges] = useState(false);
  const [processingCoupon, setProcessingCoupon] = useState(false);
  const [processingDelete, setProcessingDelete] = useState(false);

  const { data } = useSWR(
    `${CART}/${user.user_id}/${host.company.company_id}/-22.872648599999998/-46.9611568/BR/${host.company.company_id}`
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!data) return <Loading />;

  console.log(data);

  const products = data.cart_company.product;
  const cart = data.cart_company;

  console.log("caarat", user);
  if (!user.address) {
    return (
      <Cart>
        <Cart.Card style={{ textAlign: "center" }}>
          <ProfileAddressContainer
            callback={() => {
              mutate(
                `${CART}/${user.user_id}/${host.company.company_id}/-22.872648599999998/-46.9611568/BR/${host.company.company_id}`
              );
            }}
          />
        </Cart.Card>
      </Cart>
    );
  }

  if (data.cart_company_empty || products.length < 1) {
    return (
      <Cart>
        <Cart.Card style={{ textAlign: "center" }}>Carrinho vazio</Cart.Card>
      </Cart>
    );
  }

  function handleChangeTypeOrder(type) {
    setProcessingAddress(true);
    const { payment_method, user_id, company_id } = cart.info;
    axios
      .patch(CART_INFO, { payment_method, type, user_id, company_id })
      .then(async (res) => {
        console.log(res);
        await mutate(
          `${CART}/${user.user_id}/${host.company.company_id}/-22.872648599999998/-46.9611568/BR/${host.company.company_id}`
        );
        setProcessingAddress(false);
      })
      .catch((error) => {
        console.log(error);
        setProcessingAddress(false);
      });
  }

  function handleChangePayment(payment_method) {
    setmakingChanges(true);
    const { type, user_id, company_id } = cart.info;
    axios
      .patch(CART_INFO, { payment_method, type, user_id, company_id })
      .then(async (res) => {
        console.log(res);
        await mutate(
          `${CART}/${user.user_id}/${host.company.company_id}/-22.872648599999998/-46.9611568/BR/${host.company.company_id}`
        );
        setmakingChanges(false);
      })
      .catch((error) => {
        console.log(error);
        setmakingChanges(false);
      });
  }

  function handleChangeCoupon(coupon_id) {
    setProcessingCoupon(true);
    const { user_id, company_id } = cart.info;
    axios
      .patch(CART_COUPON_INFO, { source: company_id, user_id, company_id, coupon_id })
      .then(async (res) => {
        console.log(res);
        await mutate(
          `${CART}/${user.user_id}/${host.company.company_id}/-22.872648599999998/-46.9611568/BR/${host.company.company_id}`
        );
        setProcessingCoupon(false);
      })
      .catch((error) => {
        console.log(error);
        setProcessingCoupon(false);
      });
  }

  function handleOrder() {
    setProcessing(true);
    axios
      .post(CART_ORDER, { source: cart.company_id, user_id: user.user_id })
      .then((res) => {
        console.log(res);
        history.replace(ROUTES.ORDER_DETAIL, { id: res.data.order.order_id });
      })
      .catch((e) => {
        console.log(e.response.data.error.error_message);
        setProcessing(false);
      });
  }

  async function handleDeleteIcon(e, product) {
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();

    setProcessingDelete(true);
    const url = `${CART}/${user.user_id}/${host.company.company_id}/-22.872648599999998/-46.9611568/BR/${host.company.company_id}`;

    try {
      mutate(
        url,
        {
          ...data,
          cart_company: { ...data.cart_company, product: products.filter((p) => p.cart_id !== product.cart_id) },
        },
        false
      );
      await axios.delete(CART_DELETE_PRODUCT, {
        data: {
          source: cart.company_id,
          user_id: user.user_id,
          cart_id: product.cart_id,
          product_id: product.product_id,
        },
      });
      await trigger(url);
    } catch (e) {
      console.log(e);
      mutate(url);
    }
    setProcessingDelete(false);
  }

  function handleEditProduct(e, product) {
    history.push(ROUTES.PRODUCT_DETAIL, { id: product.product_id, cart_id: product.cart_id, edit: true });
  }

  return (
    <Cart>
      {Array.isArray(products) && products.length > 0 && (
        <Cart.Card>
          <Cart.Products>
            <>
              <Cart.SubTitle>Produtos</Cart.SubTitle>
              {products.map((p) => (
                <Cart.Product onClick={(e) => handleEditProduct(e, p)}>
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
                  <Cart.Price>{mMoney(p.total_price)}</Cart.Price>
                  <Cart.DeleteIcon onClick={(e) => handleDeleteIcon(e, p)} />
                </Cart.Product>
              ))}
            </>
          </Cart.Products>

          <Cart.Products>
            <select
              name="type"
              id="type"
              onChange={(e) => {
                handleChangeTypeOrder(e.target.value);
              }}
            >
              {cart.is_delivery === "1" && (
                <option selected={cart.info.type === "delivery"} value="delivery">
                  Entregar em
                </option>
              )}
              {cart.is_local === "1" && (
                <option selected={cart.info.type === "local"} value="local">
                  Retirar em
                </option>
              )}
            </select>
            {processingAddress ? (
              <Cart.Text>Carregando...</Cart.Text>
            ) : (
              <Cart.Text>{cart.info.type === "delivery" ? cart.user_address : cart.full_address}</Cart.Text>
            )}
          </Cart.Products>

          <Cart.Products>
            <Cart.Text>Forma de pagamento</Cart.Text>
            <div>
              <select name="payment1" id="payment1">
                <option value="online" disabled={true}>
                  Online
                </option>
                <option value="offline">Na {cart.info.type === "delivery" ? "entrega" : "retirada"}</option>
              </select>
              <select
                name="payment"
                id="payment"
                onChange={(e) => {
                  handleChangePayment(e.target.value);
                }}
              >
                <option value="null">Selecione..</option>
                {cart.payments.map((p) => (
                  <option selected={cart.info.payment_method === p.name} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </Cart.Products>

          <Cart.Products>
            <Cart.SubTitle>Resumo</Cart.SubTitle>
            <Cart.SubGroup column={true}>
              <Cart.SubGroup>
                <Cart.Text>Subtotal</Cart.Text>
                <Cart.Price>{processingDelete ? "Carregando.." : mMoney(cart.subtotal_amount)}</Cart.Price>
              </Cart.SubGroup>
              {cart.info.type === "delivery" && (
                <Cart.SubGroup>
                  <Cart.Text>Entrega</Cart.Text>
                  <Cart.Price>
                    {processingDelete
                      ? "Carregando.."
                      : cart.delivery_amount < 1
                      ? "Grátis"
                      : mMoney(cart.delivery_amount)}
                  </Cart.Price>
                </Cart.SubGroup>
              )}
              {data.coupon.length > 0 && (
                <Cart.SubGroup>
                  <Cart.SubGroup style={{ alignItems: "center" }}>
                    <Cart.Text>Desconto</Cart.Text> <Cart.SubText>* (Não aplicado no valor da entrega)</Cart.SubText>
                  </Cart.SubGroup>
                  <select
                    name="coupon"
                    id="coupon"
                    onChange={(e) => {
                      handleChangeCoupon(e.target.value);
                    }}
                  >
                    <option value="null">Selecione..</option>
                    {data.coupon.map((c) => (
                      <option selected={cart.info.coupon_id === c.coupon_id} value={c.coupon_id}>
                        {processingDelete
                          ? "Carregando.."
                          : cart.info.coupon_id === c.coupon_id
                          ? mMoney(cart.discount_amount)
                          : c.discount_type === "1"
                          ? parseInt(c.value) >= parseInt(cart.subtotal_amount)
                            ? mMoney(cart.subtotal_amount)
                            : mMoney(c.value)
                          : mMoney(roudHalf((c.value * cart.subtotal_amount) / 100))}
                      </option>
                    ))}
                  </select>
                </Cart.SubGroup>
              )}

              <Cart.SubGroup>
                <Cart.Text>Pagamento</Cart.Text>
                <Cart.Price>
                  {makingChanges || processingAddress
                    ? "Carregando.."
                    : `${cart.info.type === "delivery" ? "Na entrega" : "Na retirada"} - ${cart.info.payment_method}`}
                </Cart.Price>
              </Cart.SubGroup>

              <Cart.SubGroup>
                <Cart.Text style={{ fontWeight: "bold", fontSize: "16px" }}>Total</Cart.Text>
                <Cart.Price style={{ fontWeight: "bold", fontSize: "16px" }}>
                  {processingCoupon || processingDelete ? "Carregando.." : mMoney(cart.total_amount)}
                </Cart.Price>
              </Cart.SubGroup>
            </Cart.SubGroup>
          </Cart.Products>

          <Cart.SubGroup>
            <Cart.Button
              disabled={makingChanges || processingAddress || processingCoupon || processingDelete}
              onClick={handleOrder}
            >
              {processing ? "Processando..." : " Finalizar Compra"}
            </Cart.Button>
          </Cart.SubGroup>
        </Cart.Card>
      )}
    </Cart>
  );
}
