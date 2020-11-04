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
    prod.edit ? `${PRODUCT_DETAIL_CART}/${prod.id},${user.user_id},${prod.cart_id}` : `${PRODUCT_DETAIL}/${prod.id}`
  );
  const [processing, setProcessing] = useState(false);
  const [lifeCycleOption, setlifeCycleOption] = useState([]);
  const [validateSize, setValidateSize] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setlifeCycleOption(data?.collection);
    setValidateSize(data?.size);
  }, [data]);

  if (!data) return <Loading />;

  console.log(lifeCycleOption);
  console.log(validateSize);

  function checkExtrasAndSize() {
    if (
      !parseInt(
        validateSize.reduce((sum, size) => parseInt(sum) + parseInt(size.is_selected ? size.is_selected : 0), 0)
      )
    ) {
      alert("O tamanho não foi selecionado!");
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

      let productPost = {
        cart_id: "",
        company_id: data.product.company_id,
        note: "",
        product_id: data.product.product_id,
        quantity: 1,
        user_id: user.user_id,
        source: host.company.company_id,
      };

      if (data.collection) {
        productPost.extra = [];
        lifeCycleOption.map((c) => {
          c.extra.map((e) => {
            if (e.quantity > 0) {
              productPost.extra.push({
                collection_id: c.collection_id,
                user_id: user.user_id,
                cart_extra_id: "",
                cart_id: "",
                product_id: data.product.product_id,
                extra_id: e.extra_id,
                name: e.name,
                quantity: e.quantity,
                price: e.price,
              });
            }
          });
        });
      }

      if (validateSize.length) {
        validateSize.map((s) => {
          if (s.is_selected) {
            productPost.size_id = s.size_id;
            productPost.size_name = s.name;
            return;
          }
        });
      }

      axios
        .post(CART, productPost)
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
        cart_id: prod.cart_id,
        company_id: data.product.company_id,
        note: "",
        product_id: data.product.product_id,
        quantity: 1,
        user_id: user.user_id,
      };

      if (lifeCycleOption.length) {
        productPatch.extra = [];
        lifeCycleOption.map((c) => {
          c.extra.map((e) => {
            if (e.quantity > 0) {
              productPatch.extra.push({
                collection_id: c.collection_id,
                user_id: user.user_id,
                cart_extra_id: "",
                cart_id: prod.cart_id,
                product_id: data.product.product_id,
                extra_id: e.extra_id,
                name: e.name,
                quantity: e.quantity,
                price: e.price,
              });
            }
          });
        });
      }

      if (validateSize.length) {
        validateSize.map((s) => {
          if (s.is_selected) {
            productPatch.size_id = s.size_id;
            productPatch.size_name = s.name;
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
        if (size.size_id === e.currentTarget.value) {
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
                  if (e.extra_id === extra.extra_id) {
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
                  if (e.extra_id === extra.extra_id) {
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
                if (e.extra_id === extra.extra_id) {
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

  return (
    <Product>
      <Product.Card>
        <Product.Photo src={data.product.photo} />
        <Product.ContentBlock>
          <Product.Group>
            <Product.Title>{data.product.name}</Product.Title>
            <Product.Price>{mMoney(data.product.price)}</Product.Price>
          </Product.Group>
          <Product.Group boxshadow={true}>
            <Product.SubTitle>Descrição</Product.SubTitle>
            <Product.Text>{data.product.description}</Product.Text>
          </Product.Group>

          {validateSize?.length > 0 && (
            <Product.Group boxshadow={true}>
              <Product.SubTitle>Tamanhos</Product.SubTitle>
              {validateSize.map((s) => (
                <Product.SubGroup>
                  <label>
                    <Product.Input
                      onClick={handleClickRadio}
                      type="radio"
                      name="size"
                      id={data.product.product_id}
                      value={s.size_id}
                      checked={s.is_selected}
                    />
                    <Product.SubGroup className="subgroup" direction="row">
                      <Product.SubText>{s.name}</Product.SubText>
                      <Product.SubText>{s.price > 0 ? `+ R\$${s.price}` : `R\$${s.price}`}</Product.SubText>
                    </Product.SubGroup>
                  </label>
                </Product.SubGroup>
              ))}
            </Product.Group>
          )}

          {lifeCycleOption?.length > 0 && (
            <Product.Group>
              {lifeCycleOption.map((c) => (
                <>
                  <Product.SubGroup margin="15px 0 0 0">
                    <Product.Text>{c.name}</Product.Text>
                    <Product.SubText>{c.description}</Product.SubText>
                    <Product.SubText>
                      {c.min_quantity > 0 ? `minimo: ${c.min_quantity} - ` : ""} maximo: {c.max_quantity}
                    </Product.SubText>
                  </Product.SubGroup>
                  {c.extra.map((e) => (
                    <Product.SubGroup direction="row">
                      {c.min_quantity > 0 && c.max_quantity < 2 ? (
                        <label>
                          <Product.Input
                            onClick={() => handleClickOption(c, e, "RADIO")}
                            type="radio"
                            name="extra"
                            id={c.collection_id}
                            value={e.extra_id}
                            checked={e.quantity}
                          />
                          <div>
                            <Product.SubText>{e.name}</Product.SubText>
                            <Product.SubText>{e.price}</Product.SubText>
                          </div>
                        </label>
                      ) : (
                        <>
                          <Product.SubGroup margin="5px 10px 0 0" bordersub="1px solid gray" direction="row">
                            <Product.PlusIcon onClick={() => handleClickOption(c, e, "PLUS")} />
                            <Product.SubText>{e.quantity ? e.quantity : 0}</Product.SubText>
                            <Product.MinusIcon onClick={() => handleClickOption(c, e, "MINUS")} />
                          </Product.SubGroup>
                          <Product.SubGroup>
                            <Product.SubText>{e.name}</Product.SubText>
                            <Product.SubText>{e.description}</Product.SubText>
                            <Product.SubText>{e.price}</Product.SubText>
                          </Product.SubGroup>
                        </>
                      )}
                    </Product.SubGroup>
                  ))}
                </>
              ))}
            </Product.Group>
          )}
          <Product.Button onClick={prod.edit ? handleEdit : handleClick} disable={processing ? true : false}>
            {processing ? "Carregando..." : prod.edit ? "Atualizar carrinho" : "Adicionar ao carrinho"}
          </Product.Button>
        </Product.ContentBlock>
      </Product.Card>
    </Product>
  );
}
