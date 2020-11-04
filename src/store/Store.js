import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import { SWRConfig } from "swr";
import { seo } from "../helpers/seo";
import { Loading } from "../components";
import { CHECK_DOMAIN } from "../constants/apiRoutes";

const initialState = {
  user: null,
  host: {},
  companyDoesntExist: false,
};

export const Context = React.createContext();

const Store = ({ children }) => {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(true);

  async function loadContent() {
    const res = await axios.get(`${CHECK_DOMAIN}/${document.location.host}`);
    console.log(res);
    if (res.status === 200) {
      console.log("22222", res);
      const host = res.data;
      seo({
        title: host.company.name,
        metaDescription: host.company.description,
        favicon: host.company.photo,
        manifest: {
          short_name: host.company.name,
          name: host.company.name,
          start_url: ".",
          display: "standalone",
          theme_color: "#000000",
          background_color: "#ffffff",
        },
      });
      const user = JSON.parse(localStorage.getItem(`nuppin::${host.company.company_id}::user`));
      if (user) {
        axios.defaults.headers.Authorization = `Bearer ${user.refresh_token}`;
      }
      setLocalStorageHost(host);
      setState({ ...state, host: host, user: user });
      setLoading(false);
    } else if (res.status === 204) {
      setState({ ...state, companyDoesntExist: true });
      setLoading(false);
    }
  }

  useEffect(() => {
    if (document.location.host === "stores.nuppin.com") {
      window.location.replace("https://nuppin.com");
      return;
    }

    //libera rapido se tiver no localStorage
    const host = JSON.parse(localStorage.getItem(`nuppin::${document.location.host}::host`));
    if (host) {
      seo({
        title: host.company.name,
        metaDescription: host.company.description,
        favicon: host.company.photo,
        manifest: {
          short_name: host.company.name,
          name: host.company.name,
          start_url: ".",
          display: "standalone",
          theme_color: "#000000",
          background_color: "#ffffff",
        },
      });
      const user = JSON.parse(localStorage.getItem(`nuppin::${host.company.company_id}::user`));
      if (user) {
        axios.defaults.headers.Authorization = `Bearer ${user.refresh_token}`;
      }
      console.log("paassei no local:", host);
      setState({ ...state, user: user, host: host });
      setLoading(false);
    }

    //Pega as infos atualizadas em seguida
    loadContent();
  }, []);

  function setLocalStorage(user) {
    localStorage.setItem(`nuppin::${state.host.company.company_id}::user`, JSON.stringify({ ...user }));
    axios.defaults.headers.Authorization = `Bearer ${user.refresh_token}`;
    setState({ ...state, user: user });
  }

  function setLocalStorageHost(host) {
    localStorage.setItem(`nuppin::${document.location.host}::host`, JSON.stringify({ ...host }));
  }

  function removeLocalStorage(key = `nuppin::${state.host.company.company_id}::user`) {
    localStorage.removeItem(key);
    axios.defaults.headers.Authorization = null;
    setState({ ...state, user: null });
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <SWRConfig value={{ fetcher: (url) => axios.get(url).then((res) => res.data) }}>
      <Context.Provider value={{ state, setState, setLocalStorage, removeLocalStorage }}>{children}</Context.Provider>
    </SWRConfig>
  );
};

export default Store;
