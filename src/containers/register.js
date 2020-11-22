import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Form } from "../components";
import axios from "../utils/axios";
import { Context } from "../store/Store";

export function RegisterContainer() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const history = useHistory();
  const { setLocalStorage, state } = useContext(Context);
  const { host } = state;
  const [user, setUser] = useState({
    ...history.location.state.user,
    full_name: "",
    id: "",
    source: host.company.id,
  });
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const isInvalid = user.name === "";

  const handleRegister = (event) => {
    event.preventDefault();
    setProcessing(true);
    axios
      .post(`/signup`, user)
      .then((res) => {
        if (res.data instanceof Object) {
          setLocalStorage(res.data);
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
        <Form.Title>Finalize seu cadastro</Form.Title>
        {error && <Form.Error data-testid="error">{error}</Form.Error>}
        <Form.Text>Qual o seu nome?</Form.Text>
        <Form.Base onSubmit={handleRegister} method="POST">
          <Form.Input
            placeholder="Digite seu nome.."
            value={user.full_name}
            onChange={({ target }) => setUser({ ...user, full_name: target.value })}
          />
          <Form.Submit disabled={isInvalid || processing} type="submit" data-testid="name">
            {processing ? "Carregando..." : "Concluir"}
          </Form.Submit>
        </Form.Base>
        <Form.TextSmall>
          Ao se registrar você confirma que está de acordo com o nosso termo de uso.
          <Form.Link to="/terms"> Ler termos de uso.</Form.Link>
        </Form.TextSmall>
      </Form>
    </>
  );
}
