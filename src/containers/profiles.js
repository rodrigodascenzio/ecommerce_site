import React, { useContext, useState, useEffect } from "react";
import { Profile, Loading } from "../components";
import { EditIcon } from "../components/profile/styles/profile";
import { USER_AND_ADDRESS, USERS } from "../constants/apiRoutes";
import { Context } from "../store/Store";
import useSWR from "swr";
import * as ROUTES from "../constants/routes";
import axios from "../utils/axios";
import { mCPF } from "../utils/masks";
import { useHistory } from "react-router-dom";
import { ProfileAddressContainer } from "./profileAddress";
import { Background } from "../components/header/styles/header";

export function ProfileContainer() {
  const { state, removeLocalStorage, setLocalStorage } = useContext(Context);
  const { user } = state;
  const history = useHistory();
  const [userAddress, setUserAddress] = useState();
  const [processing, setProcessing] = useState(false);
  const { data } = useSWR(`${USER_AND_ADDRESS}/${user.user_id}`);

  function handleUserInfo(e) {
    setProcessing(true);
    e.preventDefault();
    const obj = { user_id: data.user_id, full_name: userAddress.full_name };
    if (!data.document_number) {
      obj.document_number = userAddress.document_number;
    }
    axios
      .patch(USERS, { ...obj })
      .then(async (res) => {
        await setLocalStorage({ ...user, ...res.data });
        setProcessing(false);
      })
      .catch((error) => {
        setProcessing(false);
        console.log(error);
      });
  }

  function handleEditEmail(e) {
    e.preventDefault();
    history.push(ROUTES.EMAIL, { update: true });
  }

  function handleEditPhone(e) {
    e.preventDefault();
    history.push(ROUTES.SMS, { update: true });
  }

  useEffect(() => {
    setUserAddress(data);
  }, [data]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!data) return <Loading />;

  const isInvalidUser = !userAddress?.full_name || userAddress?.document_number.length < 14;

  return (
    <>
      <Profile>
        <Profile.Card>
          <Profile.Form>
            <Profile.Content>
              <Profile.Base onSubmit={handleUserInfo}>
                <Profile.Group marginbottomtitle={data.photo ? "" : "51"}>
                  <Profile.Title>Perfil</Profile.Title>
                  {data.photo && (
                    <Profile.data>
                      <Profile.Picture src={data.photo} />
                    </Profile.data>
                  )}
                  <Profile.Input
                    type="text"
                    placeholder="Nome"
                    value={userAddress?.full_name}
                    onChange={({ target }) => setUserAddress({ ...userAddress, full_name: target.value })}
                  />
                  <Profile.Input
                    disabled={data.document_number ? true : false}
                    placeholder="CPF"
                    maxLength="14"
                    value={userAddress?.document_number}
                    onChange={({ target }) => setUserAddress({ ...userAddress, document_number: mCPF(target.value) })}
                  />
                  <Profile.Div>
                    <Profile.Input disabled={true} type="email" placeholder="Email" value={data.email} />
                    <EditIcon size="24" onClick={handleEditEmail} />
                  </Profile.Div>
                  <Profile.Div>
                    <Profile.Input disabled={true} type="text" placeholder="Celular" value={data.phone_number} />
                    <EditIcon size="24" onClick={handleEditPhone} />
                  </Profile.Div>
                  <Profile.Submit disabled={isInvalidUser || processing}>
                    {processing ? "Carregando..." : "Salvar Perfil"}
                  </Profile.Submit>
                </Profile.Group>
              </Profile.Base>
              <ProfileAddressContainer address={data.address} />
            </Profile.Content>
            <Profile.Group
              style={{
                margin: 0,
                padding: 0,
                borderTop: "1px solid #ccc",
                borderRadius: 0,
              }}
            >
              <Profile.Logout
                onClick={() => {
                  removeLocalStorage();
                }}
              >
                Sair
              </Profile.Logout>
            </Profile.Group>
          </Profile.Form>
        </Profile.Card>
      </Profile>
    </>
  );
}
