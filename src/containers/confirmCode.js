import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Form } from "../components";
import * as ROUTES from "../constants/routes";
import axios from "../utils/axios";
import { VERIFY_CODE_EMAIL, CHANGE_EMAIL, CHANGE_PHONE_NUMBER, VERIFY_CODE_SMS } from "../constants/apiRoutes";
import { Context } from "../store/Store";
import { mNum } from "../utils/masks";

export function ConfirmCodeContainer() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const history = useHistory();

  if (!history.location.state) {
    history.replace(ROUTES.HOME);
  }

  const { setLocalStorage, state } = useContext(Context);
  const { user: userLocal } = state;
  const [user, setUser] = useState({
    ...history.location.state?.user,
    code_sent: "",
    source: "nuppin",
    user_id: userLocal?.id,
  });
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  const isInvalid = user.code_sent.length < 6;

  const handleSignin = (event) => {
    event.preventDefault();
    setProcessing(true);
    axios[history.location.state.update ? "patch" : "post"](`${history.location.state.path}`, user)
      .then((res) => {
        if (res.data instanceof Object) {
          setLocalStorage(res.data);
          history.push(ROUTES.HOME);
        } else if (res.data === 1) {
          if (history.location.state.path === VERIFY_CODE_EMAIL || history.location.state.path === CHANGE_EMAIL) {
            if (history.location.state.path === VERIFY_CODE_EMAIL) {
              history.push(ROUTES.REGISTER, {
                user: { email: user.id },
              });
            } else if (history.location.state.path === CHANGE_EMAIL) {
              history.push(ROUTES.PROFILE);
            }
          } else if (
            history.location.state.path === VERIFY_CODE_SMS ||
            history.location.state.path === CHANGE_PHONE_NUMBER
          ) {
            if (history.location.state.path === VERIFY_CODE_SMS) {
              history.push(ROUTES.REGISTER, {
                user: { phone_number: user.id },
              });
            } else if (history.location.state.path === CHANGE_PHONE_NUMBER) {
              history.push(ROUTES.PROFILE);
            }
          }
        } else {
          setError("Erro ao confirmar o codigo");
          setProcessing(false);
        }
      })
      .catch((error) => {
        setError(error.message);
        setProcessing(false);
      });
  };

  return (
    <>
      <Form>
        <Form.Title>Confirme o código</Form.Title>
        {error && <Form.Error data-testid="error">{error}</Form.Error>}
        <Form.TextSmall>{`Foi enviado um código ${user.id ? "SMS" : ""} de verificação para o seu ${
          user.id ? "número" : "email"
        }. Insira esse código no campo abaixo para se entrar`}</Form.TextSmall>
        <Form.Base onSubmit={handleSignin} method="POST">
          <Form.Input
            placeholder="Insira o código"
            value={user.code_sent}
            onChange={({ target }) => setUser({ ...user, code_sent: target.value.trim() })}
          />
          <Form.Submit disabled={isInvalid || processing} type="submit">
            {processing ? "Carregando..." : "Confirmar"}
          </Form.Submit>
        </Form.Base>

        <Form.TextSmall>{`Esse código ${user.id ? "SMS" : ""} pode demorar alguns minutos para chegar. ${
          user.id ? "Verifique também na sua caixa de spam / lixo eletronico." : ""
        }`}</Form.TextSmall>

        <Form.Text style={{ cursor: "pointer" }} onClick={() => history.goBack()}>
          Não recebeu o código? Envie novamente!
        </Form.Text>
      </Form>
    </>
  );
}
