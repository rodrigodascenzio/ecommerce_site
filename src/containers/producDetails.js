import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Product, Loading } from "../components";
import { PRODUCT_DETAIL, CART, PRODUCT_DETAIL_CART, CART_EDIT } from "../constants/apiRoutes";
import useSWR from "swr";
import { Context } from "../store/Store";
import * as ROUTES from "../constants/routes";
import axios from "../utils/axios";
import { mMoney } from "../utils/masks";

export function ProductDetailsContainer() {
  const history = useHistory();
  const [prod] = useState({ ...history.location.state });
  const { state } = useContext(Context);
  const { user, host } = state;
  const { data } = useSWR(
    prod.edit ? `${PRODUCT_DETAIL_CART}/${prod.id},${user.id},${prod.cart_id}` : `${PRODUCT_DETAIL}/${prod.id}`
  );
  const [processing, setProcessing] = useState(false);
  const [lifeCycleOption, setlifeCycleOption] = useState([]);
  const [validateSize, setValidateSize] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setlifeCycleOption(data?.collection);
    setValidateSize(data?.size);
    if (prod.edit) setQuantity(data?.product.cart_quantity);
  }, [data]);

  if (!data) return <Loading />;

  console.log(lifeCycleOption);
  console.log(validateSize);

  function checkExtrasAndSize() {
    if (
      !parseInt(
        validateSize.reduce((sum, size) => parseInt(sum) + parseInt(size.is_selected ? size.is_selected : 0), 0)
      ) &&
      data.size.length
    ) {
      alert("O tamanho não foi selecionado");
      return true;
    }

    let hasNotSelectRequiredItems = lifeCycleOption.some((c) => {
      if (
        c.min_quantity >
        parseInt(c.extra.reduce((sum, extra) => parseInt(sum) + parseInt(extra.quantity ? extra.quantity : 0), 0))
      ) {
        alert("Existem opções obrigatorias que não foram selecionadas");
        return true;
      }
    });
    if (hasNotSelectRequiredItems) return true;
  }

  function handleClick(e) {
    if (checkExtrasAndSize()) return;

    if (user) {
      setProcessing(true);

      let productToCart = {
        id: "",
        company_id: data.product.company_id,
        note: "",
        product_id: data.product.id,
        quantity: quantity,
        user_id: user.id,
        source: host.company.id,
      };

      if (data.collection) {
        productToCart.extra = [];
        lifeCycleOption.map((c) => {
          c.extra.map((extra) => {
            if (extra.quantity > 0) {
              productToCart.extra.push({
                collection_id: c.collection_id,
                collection_extra_id: extra.collection_extra_id,
                user_id: user.id,
                id: "",
                cart_id: "",
                product_id: data.product.id,
                extra_id: extra.id,
                name: extra.name,
                quantity: extra.quantity,
                price: extra.price,
              });
            }
          });
        });
      }

      if (validateSize.length) {
        validateSize.map((size) => {
          if (size.is_selected) {
            productToCart.size_id = size.id;
            productToCart.size_name = size.name;
            return;
          }
        });
      }

      axios
        .post(CART, productToCart)
        .then((res) => {
          history.push(ROUTES.CART);
        })
        .catch((error) => {
          // setError(error.message);
          setProcessing(false);
        });
    } else {
      history.push(ROUTES.SIGN_IN);
    }
  }

  function handleEdit(e) {
    if (checkExtrasAndSize()) return;

    if (user) {
      setProcessing(true);

      let productPatch = {
        id: prod.cart_id,
        company_id: data.product.company_id,
        note: "",
        product_id: data.product.id,
        quantity: quantity,
        user_id: user.id,
      };

      if (lifeCycleOption.length) {
        productPatch.extra = [];
        lifeCycleOption.map((c) => {
          c.extra.map((extra) => {
            if (extra.quantity > 0) {
              productPatch.extra.push({
                cart_id: prod.cart_id,
                collection_id: c.collection_id,
                collection_extra_id: extra.collection_extra_id,
                user_id: extra.user_id,
                id: "",
                product_id: extra.product_id,
                extra_id: extra.id,
                name: extra.name,
                quantity: extra.quantity,
                price: extra.price,
              });
            }
          });
        });
      }

      if (validateSize.length) {
        validateSize.map((size) => {
          if (size.is_selected) {
            productPatch.size_id = size.id;
            productPatch.size_name = size.name;
            return;
          }
        });
      }

      axios
        .patch(CART_EDIT, productPatch)
        .then((res) => {
          history.push(ROUTES.CART);
        })
        .catch((error) => {
          // setError(error.message);
          setProcessing(false);
        });
    } else {
      history.push(ROUTES.SIGN_IN);
    }
  }

  function handleClickRadio(e) {
    setValidateSize(
      validateSize.map((size) => {
        if (size.id === e.currentTarget.value) {
          return { ...size, is_selected: 1 };
        } else {
          return { ...size, is_selected: 0 };
        }
      })
    );
  }

  function handleClickOption(collection, extra, type) {
    let hasToUpdate = false;
    let updatedList = lifeCycleOption.map((o) => {
      if (o.collection_id === collection.collection_id) {
        switch (type) {
          case "PLUS":
            if (
              parseInt(o.max_quantity) >
              o.extra.reduce((sum, extras) => parseInt(sum) + parseInt(extras.quantity ? extras.quantity : 0), 0)
            ) {
              hasToUpdate = true;
              return {
                ...o,
                extra: o.extra.map((e) => {
                  if (e.id === extra.id) {
                    return {
                      ...e,
                      quantity: e.quantity ? parseInt(e.quantity) + 1 : 1,
                    };
                  }
                  return e;
                }),
              };
            }
            break;
          case "MINUS":
            if (
              o.extra.reduce((sum, extras) => parseInt(sum) + parseInt(extras.quantity ? extras.quantity : 0), 0) > 0
            ) {
              hasToUpdate = true;
              return {
                ...o,
                extra: o.extra.map((e) => {
                  if (e.id === extra.id) {
                    return { ...e, quantity: e.quantity ? parseInt(e.quantity) - 1 : 0 };
                  }
                  return e;
                }),
              };
            }
            break;
          case "RADIO":
            hasToUpdate = true;
            return {
              ...o,
              extra: o.extra.map((e) => {
                if (e.id === extra.id) {
                  return { ...e, quantity: 1 };
                } else {
                  return { ...e, quantity: 0 };
                }
              }),
            };
        }
      }
      return o;
    });
    if (hasToUpdate) setlifeCycleOption(updatedList);
  }

  function handleClickQuantity(type) {
    switch (type) {
      case "PLUS":
        setQuantity(parseInt(quantity) + 1);
        break;
      case "MINUS":
        if (quantity > 1) setQuantity(parseInt(quantity) - 1);
        break;
    }
  }

  return (
    <Product>
      <Product.Card>
        <Product.Photo src={data.product.photo} />
        <Product.ContentBlock>
          <Product.Group>
            <Product.Title>{data.product.name}</Product.Title>
            <Product.Price>{mMoney(data.product.price)}</Product.Price>
          </Product.Group>
          <Product.Group style={{ borderBottom: "2px solid #fafafa" }}>
            <Product.SubTitle>Descrição</Product.SubTitle>
            <Product.Text style={{ color: "#484848", fontSize: "14px" }}>{data.product.description}</Product.Text>
          </Product.Group>

          {validateSize?.length > 0 && (
            <Product.Group>
              <Product.Text style={{ padding: "0 10px" }}>Tamanhos</Product.Text>
              {validateSize.map((size) => (
                <Product.SubGroup
                  style={{
                    background: size.stock_quantity < 1 ? "#fafafa" : "none",
                    color: size.stock_quantity < 1 ? "#ccc" : "",
                  }}
                >
                  <label>
                    <Product.Input
                      disabled={size.stock_quantity < 1}
                      onClick={handleClickRadio}
                      type="radio"
                      name="size"
                      id={size.product_id}
                      value={size.id}
                      checked={size.is_selected}
                    />
                    <Product.SubGroup className="subgroup" direction="row">
                      <Product.SubText>{size.name}</Product.SubText>
                      <Product.SubText>
                        {size.price > 0 ? `+ ${mMoney(size.price)}` : `${mMoney(size.price)}`}
                      </Product.SubText>
                    </Product.SubGroup>
                  </label>
                </Product.SubGroup>
              ))}
            </Product.Group>
          )}

          {lifeCycleOption?.length > 0 && (
            <Product.Group>
              {lifeCycleOption.map((c) => (
                <div style={{ margin: "0 0 10px 0" }}>
                  <Product.SubGroup style={{ background: "#fafafa", padding: "5px" }} margin="0 0 10px 0">
                    <Product.Text style={{ margin: "5px 0" }}>{c.name}</Product.Text>
                    <Product.SubText>{c.description}</Product.SubText>
                    <Product.SubText>
                      {c.min_quantity > 0 ? `minimo: ${c.min_quantity} - ` : ""} maximo: {c.max_quantity}
                    </Product.SubText>
                  </Product.SubGroup>
                  {c.extra.map((e) => (
                    <Product.SubGroup direction="row">
                      {c.min_quantity > 0 && c.max_quantity < 2 ? (
                        <label style={{ width: "100%", padding: "10px 0" }}>
                          <Product.Input
                            onClick={() => handleClickOption(c, e, "RADIO")}
                            type="radio"
                            name="extra"
                            id={c.collection_id}
                            value={e.id}
                            checked={e.quantity}
                          />
                          <div>
                            <Product.SubText>{e.name}</Product.SubText>
                            <Product.SubText>{mMoney(e.price)}</Product.SubText>
                          </div>
                        </label>
                      ) : (
                        <Product.SubGroup direction="row" style={{ margin: "5px" }}>
                          <Product.SubGroup margin="5px 10px 0 0" bordersub="1px solid gray" direction="row">
                            <Product.MinusIcon onClick={() => handleClickOption(c, e, "MINUS")} />
                            <Product.SubText>{e.quantity ? e.quantity : 0}</Product.SubText>
                            <Product.PlusIcon onClick={() => handleClickOption(c, e, "PLUS")} />
                          </Product.SubGroup>
                          <Product.SubGroup>
                            <Product.SubText style={{ color: "#303030" }}>{e.name}</Product.SubText>
                            <Product.SubText style={{ color: "#ccc" }}>{e.description}</Product.SubText>
                            <Product.SubText>{mMoney(e.price)}</Product.SubText>
                          </Product.SubGroup>
                        </Product.SubGroup>
                      )}
                    </Product.SubGroup>
                  ))}
                </div>
              ))}
            </Product.Group>
          )}
          <Product.Group style={{ display: "flex", alignItems: "flex-end", flexWrap: "wrap", margin: "auto 0 0 auto" }}>
            <Product.SubGroup
              bordersub="1px solid gray"
              direction="row"
              style={{ padding: "5px 0px", fontWeight: "bold" }}
            >
              <Product.MinusIcon size="20" onClick={() => handleClickQuantity("MINUS")} />
              <Product.SubText>{quantity}</Product.SubText>
              <Product.PlusIcon size="20" onClick={() => handleClickQuantity("PLUS")} />
            </Product.SubGroup>
            <Product.Button onClick={prod.edit ? handleEdit : handleClick} disable={processing ? true : false}>
              {processing ? "Carregando..." : prod.edit ? "Atualizar carrinho" : "Adicionar ao carrinho"}
            </Product.Button>
          </Product.Group>
        </Product.ContentBlock>
      </Product.Card>
    </Product>
  );
}
