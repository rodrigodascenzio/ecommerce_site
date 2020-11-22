import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Cart, Loading, NotFound } from "../components";
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
    `${CART}/${user.id}/${host.company.id}/-22.872648599999998/-46.9611568/BR/${host.company.id}`
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!data) return <Loading />;

  console.log(data);

  const cartItems = data.cart_company.product;
  const cartAll = data.cart_company;

  console.log("caarat", user);

  if (!user.address) {
    return (
      <Cart>
        <Cart.Card style={{ textAlign: "center" }}>
          <ProfileAddressContainer
            callback={() => {
              mutate(`${CART}/${user.id}/${host.company.id}/-22.872648599999998/-46.9611568/BR/${host.company.id}`);
            }}
          />
        </Cart.Card>
      </Cart>
    );
  }

  if (data.cart_company_empty || cartItems.length < 1) {
    return (
      <Cart>
        <Cart.Card>
          <NotFound>
            <NotFound.Card>
              <NotFound.Img src={require("../images/misc/error.svg")} />
              <NotFound.Text>Carrinho vazio</NotFound.Text>
            </NotFound.Card>
          </NotFound>
        </Cart.Card>
      </Cart>
    );
  }

  function handleChangeTypeOrder(type) {
    setProcessingAddress(true);
    const { payment_method, user_id, company_id } = cartAll.info;
    axios
      .patch(CART_INFO, { payment_method, type, user_id, company_id })
      .then(async (res) => {
        console.log(res);
        await mutate(`${CART}/${user.id}/${host.company.id}/-22.872648599999998/-46.9611568/BR/${host.company.id}`);
        setProcessingAddress(false);
      })
      .catch((error) => {
        console.log(error);
        setProcessingAddress(false);
      });
  }

  function handleChangePayment(payment_method) {
    setmakingChanges(true);
    const { type, user_id, company_id } = cartAll.info;
    axios
      .patch(CART_INFO, { payment_method, type, user_id, company_id })
      .then(async (res) => {
        console.log(res);
        await mutate(`${CART}/${user.id}/${host.company.id}/-22.872648599999998/-46.9611568/BR/${host.company.id}`);
        setmakingChanges(false);
      })
      .catch((error) => {
        console.log(error);
        setmakingChanges(false);
      });
  }

  function handleChangeCoupon(coupon_id) {
    setProcessingCoupon(true);
    const { user_id, company_id } = cartAll.info;
    axios
      .patch(CART_COUPON_INFO, { source: company_id, user_id, company_id, coupon_id })
      .then(async (res) => {
        console.log(res);
        await mutate(`${CART}/${user.id}/${host.company.id}/-22.872648599999998/-46.9611568/BR/${host.company.id}`);
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
      .post(CART_ORDER, { source: cartAll.company_id, user_id: cartAll.user_id })
      .then((res) => {
        console.log(res);
        history.replace(ROUTES.ORDER_DETAIL, { id: res.data.order.id });
      })
      .catch((e) => {
        console.log(e.response.data.error.error_message);
        setProcessing(false);
      });
  }

  async function handleDeleteIcon(e, cartItem) {
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();

    setProcessingDelete(true);
    const url = `${CART}/${user.id}/${host.company.id}/-22.872648599999998/-46.9611568/BR/${host.company.id}`;

    try {
      mutate(
        url,
        {
          ...data,
          cart_company: { ...data.cart_company, product: cartItems.filter((c) => c.id !== cartItem.id) },
        },
        false
      );
      await axios.delete(CART_DELETE_PRODUCT, {
        data: {
          source: cartItem.company_id,
          user_id: cartItem.user_id,
          id: cartItem.id,
          product_id: cartItem.product_id,
        },
      });
      await trigger(url);
    } catch (e) {
      console.log(e);
      mutate(url);
    }
    setProcessingDelete(false);
  }

  function handleEditProduct(e, cartItem) {
    history.push(ROUTES.PRODUCT_DETAIL, { id: cartItem.product_id, cart_id: cartItem.id, edit: true });
  }

  return (
    <Cart>
      {Array.isArray(cartItems) && cartItems.length > 0 && (
        <Cart.Card>
          <Cart.Title style={{ margin: "20px 5px" }}>Carrinho</Cart.Title>
          <Cart.Products>
            <>
              {cartItems.map((p) => (
                <Cart.Product
                  style={{ border: parseInt(p.is_available) ? "none" : "1px solid red" }}
                  onClick={(e) => handleEditProduct(e, p)}
                >
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
            <Cart.Select
              name="type"
              id="type"
              onChange={(e) => {
                handleChangeTypeOrder(e.target.value);
              }}
            >
              {cartAll.is_delivery === "1" && (
                <option selected={cartAll.info.type === "delivery"} value="delivery">
                  Entregar em
                </option>
              )}
              {cartAll.is_local === "1" && (
                <option selected={cartAll.info.type === "local"} value="local">
                  Retirar em
                </option>
              )}
            </Cart.Select>
            {processingAddress ? (
              <Cart.Text>Carregando...</Cart.Text>
            ) : (
              <Cart.Text>{cartAll.info.type === "delivery" ? cartAll.user_address : cartAll.full_address}</Cart.Text>
            )}
          </Cart.Products>

          <Cart.Products>
            <Cart.Text>Forma de pagamento</Cart.Text>
            <div>
              <Cart.Select name="payment1" id="payment1">
                <option value="online" disabled={true}>
                  Online
                </option>
                <option value="offline">Na {cartAll.info.type === "delivery" ? "entrega" : "retirada"}</option>
              </Cart.Select>
              <Cart.Select
                name="payment"
                id="payment"
                onChange={(e) => {
                  handleChangePayment(e.target.value);
                }}
              >
                <option value="null">Selecione..</option>
                {cartAll.payments.map((p) => (
                  <option selected={cartAll.info.payment_method === p.name} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </Cart.Select>
            </div>
          </Cart.Products>

          <Cart.Products>
            <Cart.SubTitle>Resumo</Cart.SubTitle>
            <Cart.SubGroup column={true}>
              <Cart.SubGroup>
                <Cart.Text>Subtotal</Cart.Text>
                <Cart.Price>{processingDelete ? "Carregando.." : mMoney(cartAll.subtotal_amount)}</Cart.Price>
              </Cart.SubGroup>
              {cartAll.info.type === "delivery" && (
                <Cart.SubGroup>
                  <Cart.Text>Entrega</Cart.Text>
                  <Cart.Price>
                    {processingDelete
                      ? "Carregando.."
                      : cartAll.delivery_amount < 1
                      ? "Grátis"
                      : mMoney(cartAll.delivery_amount)}
                  </Cart.Price>
                </Cart.SubGroup>
              )}
              {data.coupon.length > 0 && (
                <Cart.SubGroup>
                  <Cart.SubGroup style={{ alignItems: "center" }}>
                    <Cart.Text>Desconto</Cart.Text> <Cart.SubText>* (Não aplicado no valor da entrega)</Cart.SubText>
                  </Cart.SubGroup>
                  <Cart.Select
                    name="coupon"
                    id="coupon"
                    onChange={(e) => {
                      handleChangeCoupon(e.target.value);
                    }}
                  >
                    <option value="null">Selecione..</option>
                    {data.coupon.map((c) => (
                      <option selected={cartAll.info.coupon_id === c.id} value={c.id}>
                        {processingDelete
                          ? "Carregando.."
                          : cartAll.info.coupon_id === c.id
                          ? mMoney(cartAll.discount_amount)
                          : c.discount_type === "1"
                          ? parseInt(c.value) >= parseInt(cartAll.subtotal_amount)
                            ? mMoney(cartAll.subtotal_amount)
                            : mMoney(c.value)
                          : mMoney(roudHalf((c.value * cartAll.subtotal_amount) / 100))}
                      </option>
                    ))}
                  </Cart.Select>
                </Cart.SubGroup>
              )}

              <Cart.SubGroup>
                <Cart.Text>Pagamento</Cart.Text>
                <Cart.Price>
                  {makingChanges || processingAddress
                    ? "Carregando.."
                    : `${cartAll.info.type === "delivery" ? "Na entrega" : "Na retirada"} - ${
                        cartAll.info.payment_method ? cartAll.info.payment_method : "Não definido"
                      }`}
                </Cart.Price>
              </Cart.SubGroup>

              <Cart.SubGroup>
                <Cart.Text style={{ fontWeight: "bold", fontSize: "16px" }}>Total</Cart.Text>
                <Cart.Price style={{ fontWeight: "bold", fontSize: "16px" }}>
                  {processingCoupon || processingDelete ? "Carregando.." : mMoney(cartAll.total_amount)}
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
