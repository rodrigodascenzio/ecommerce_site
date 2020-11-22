import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Form } from "../components";
import * as ROUTES from "../constants/routes";
import {
  SEND_EMAIL,
  CHANGE_EMAIL,
  SEND_SMS,
  CHANGE_PHONE_NUMBER,
  VERIFY_CODE_EMAIL,
  VERIFY_CODE_SMS,
} from "../constants/apiRoutes";
import axios from "../utils/axios";
import { mTel, mNum } from "../utils/masks";
import { Context } from "../store/Store";

export function SignInContainer() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const history = useHistory();
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const { state } = useContext(Context);
  const { user: userLocal } = state;

  if (userLocal && !history.location.state) {
    history.replace(ROUTES.HOME);
  }

  const isInvalid = !user.id && !user.id;

  const handleEmail = (event) => {
    event.preventDefault();
    setProcessing(true);
    axios
      .post(SEND_EMAIL, user)
      .then((res) => {
        if (res.data) {
          if (history.location.state?.update) {
            history.push(ROUTES.CONFIRM_CODE, { user, path: CHANGE_EMAIL, update: true });
          } else {
            history.push(ROUTES.CONFIRM_CODE, { user, path: VERIFY_CODE_EMAIL, update: false });
          }
        }
      })
      .catch((error) => {
        setError(error.message);
        setProcessing(false);
      });
  };

  const handleSMS = (event) => {
    event.preventDefault();
    setProcessing(true);
    user.id = `+55${mNum(user.id)}`;
    axios
      .post(SEND_SMS, user)
      .then((res) => {
        if (res.data) {
          if (history.location.state?.update) {
            history.push(ROUTES.CONFIRM_CODE, { user, path: CHANGE_PHONE_NUMBER, update: true });
          } else {
            history.push(ROUTES.CONFIRM_CODE, { user, path: VERIFY_CODE_SMS, update: false });
          }
        }
      })
      .catch((error) => {
        setError(error.message);
        setProcessing(false);
      });
  };

  function handleSignInOption(option) {
    switch (option) {
      case ROUTES.EMAIL:
        history.push(ROUTES.EMAIL);
        break;
      case ROUTES.SMS:
        history.push(ROUTES.SMS);
        break;
    }
  }

  if (document.location.pathname === ROUTES.SIGN_IN) {
    return (
      <Form>
        <Form.Title>Como deseja entrar?</Form.Title>
        <Form.Submit
          onClick={() => {
            handleSignInOption(ROUTES.EMAIL);
          }}
        >
          EMAIL
        </Form.Submit>
        <Form.Submit
          onClick={() => {
            handleSignInOption(ROUTES.SMS);
          }}
        >
          CELULAR
        </Form.Submit>
      </Form>
    );
  }

  return (
    <Form>
      <Form.Title>{`${history.location.state?.update ? "Trocar" : "Entrar com"} ${
        document.location.pathname === ROUTES.EMAIL ? "email" : "número de telefone"
      }`}</Form.Title>
      {error && <Form.Error data-testid="error">{error}</Form.Error>}

      <Form.Base onSubmit={document.location.pathname === ROUTES.EMAIL ? handleEmail : handleSMS} method="POST">
        {document.location.pathname === ROUTES.EMAIL && (
          <Form.Input
            type="email"
            placeholder="seu@email.com"
            value={user.id}
            onChange={({ target }) => setUser({ ...user, id: target.value })}
          />
        )}
        {document.location.pathname === ROUTES.SMS && (
          <Form.Input
            type="text"
            placeholder="(00) 0 0000 0000"
            value={user.id}
            maxLength="14"
            onChange={({ target }) => setUser({ ...user, id: mTel(target.value) })}
          />
        )}
        <Form.Submit disabled={isInvalid || processing} type="submit" data-testid="sign-in">
          {processing ? "Carregando..." : "Prosseguir"}
        </Form.Submit>
      </Form.Base>

      {/* <Form.Text>Entrar com numero de celular?</Form.Text> */}
      <Form.TextSmall>{`Ao clicar em prosseguir, será enviado um código de confirmação para o seu ${
        document.location.pathname === ROUTES.EMAIL ? "email" : "número"
      }`}</Form.TextSmall>
    </Form>
  );
}
