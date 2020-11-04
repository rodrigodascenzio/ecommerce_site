import React, { useContext, useState, useEffect } from "react";
import { Profile } from "../components";
import { ADDRESS } from "../constants/apiRoutes";
import { Context } from "../store/Store";
import axios from "../utils/axios";
import { mNum } from "../utils/masks";
import { geocoding } from "../utils/googleMapsApi";

export function ProfileAddressContainer({ address, callback }) {
  const { state, setLocalStorage } = useContext(Context);
  const { user } = state;
  const [userAddress, setUserAddress] = useState();
  const [processing, setProcessing] = useState(false);

  async function handleUserAddress(e) {
    setProcessing(true);
    e.preventDefault();
    const stringAddress = `${userAddress.address.street}, ${userAddress.address.street_number} - ${userAddress.address.district}, ${userAddress.city} - ${userAddress.address.state_code}`;
    const addressGeo = await geocoding(stringAddress);
    const method = address ? "patch" : "post";
    axios[method](ADDRESS, {
      ...addressGeo,
      address_id: address ? address.address_id : "",
      user_id: user.user_id,
      complement: userAddress.address.complement,
    })
      .then(async (res) => {
        console.log("ihaaaaaaaaa", res);
        await setLocalStorage({ ...user, address: addressGeo });
        if (typeof callback === "function") {
          callback();
        } else {
          setProcessing(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setProcessing(false);
      });
  }

  useEffect(() => {
    setUserAddress({ address });
  }, [address]);

  const isInvalidAddress =
    !userAddress?.address?.street ||
    !userAddress?.address?.street_number ||
    !userAddress?.address?.district ||
    !userAddress?.address?.city ||
    !userAddress?.address?.state_code;

  return (
    <>
      <Profile.Base onSubmit={handleUserAddress} style={callback ? { maxWidth: "600px", margin: "10px auto" } : {}}>
        <Profile.Group marginbottomtitle={user.photo ? "139" : ""}>
          <Profile.Title>Endereço</Profile.Title>
          <Profile.Input
            type="text"
            placeholder="Rua"
            value={userAddress?.address?.street}
            onChange={({ target }) =>
              setUserAddress({ ...userAddress, address: { ...userAddress.address, street: target.value } })
            }
          />
          <Profile.Input
            type="text"
            placeholder="Numero"
            value={userAddress?.address?.street_number}
            maxLength="5"
            onChange={({ target }) =>
              setUserAddress({
                ...userAddress,
                address: { ...userAddress.address, street_number: mNum(target.value) },
              })
            }
          />
          <Profile.Input
            type="text"
            placeholder="Bairro"
            value={userAddress?.address?.district}
            onChange={({ target }) =>
              setUserAddress({ ...userAddress, address: { ...userAddress.address, district: target.value } })
            }
          />
          <Profile.Input
            type="text"
            placeholder="Cidade"
            value={userAddress?.address?.city}
            onChange={({ target }) =>
              setUserAddress({ ...userAddress, address: { ...userAddress.address, city: target.value } })
            }
          />
          <Profile.Input
            type="text"
            placeholder="Estado"
            maxLength="2"
            value={userAddress?.address?.state_code}
            onChange={({ target }) =>
              setUserAddress({
                ...userAddress,
                address: { ...userAddress.address, state_code: target.value.toUpperCase() },
              })
            }
          />
          <Profile.Input
            type="text"
            placeholder="Complemento"
            value={userAddress?.address?.complement}
            onChange={({ target }) =>
              setUserAddress({ ...userAddress, address: { ...userAddress.address, complement: target.value } })
            }
          />
          <Profile.Submit disabled={isInvalidAddress || processing}>
            {processing ? "Salvando..." : address ? "Atualizar Endereço" : "Salvar Endereço"}
          </Profile.Submit>
        </Profile.Group>
      </Profile.Base>
    </>
  );
}
