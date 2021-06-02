import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { VscLoading } from "react-icons/vsc";
import { IconContext } from "react-icons";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  LOGIN_STATUS_CHANGED,
  TOKEN_CHANGED,
  USERNAME_CHANGED,
  USER_ID_CHANGED,
  ADMIN_STATUS_CHANGED,
  USER_SHOPNAME_CHANGED,
  USER_COLOR_CHANGED,
} from "../actions/actionsForSite";

const axios = require("axios");
const Cookie = require("js-cookie");

const Authorization = ({
  login,
  setLogin,
  setToken,
  setShopName,
  setUsername,
  setColor,
  setAdmin,
  urlServer,
  setId,
}) => {
  const [redirectTime, setRedirectTime] = useState(false);
  const [successFalse, setSuccessFalse] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (!login) {
      axios({
        method: "get",
        url: urlServer + "/users/market_confirmation/" + id,
      })
        .then((response) => {
          if (response.data.success === true) {
            // console.log(response.data.success);
            setLogin(response.data.success);
            setToken(response.data.token);
            setId(response.data.id);
            setColor(response.data.color);
            setAdmin(response.data.admin);
            setShopName(response.data.shopName);
            Cookie.set("Info", response.data.username, {
              expires: 2,
              sameSite: "Lax",
              secure: true,
            });
            Cookie.set("Authorization", response.data.token, {
              expires: 2,
              sameSite: "Lax",
              secure: true,
            });
            setUsername(response.data.username);
            setRedirectTime(true);
          } else {
            setSuccessFalse(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setRedirectTime(true);
    }

    return () => {};
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {redirectTime ? <Redirect to="/" /> : <></>}
      {successFalse ? (
        <>
          a problem occured please try again later. Close all tabs and
          reconnect. If problem still continues, contact with admins
        </>
      ) : (
        <></>
      )}
      <article>
        <div style={{ height: "30vh" }}></div>
        <div className="d-flex justify-content-center">
          <h5 className="rotate360">
            <IconContext.Provider
              value={{
                color: "blue",
                className: "global-className",
                size: "50px",
              }}
            >
              <VscLoading />
            </IconContext.Provider>
          </h5>
        </div>
        <br />
        <br />
      </article>
    </>
  );
};

const mapStateToProps = (store) => {
  const { login, urlServer } = store.site;
  return { login, urlServer };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLogin: (login) =>
      dispatch({ type: LOGIN_STATUS_CHANGED, payload: { login } }),
    setToken: (token) => dispatch({ type: TOKEN_CHANGED, payload: { token } }),
    setUsername: (username) =>
      dispatch({ type: USERNAME_CHANGED, payload: { username } }),
    setId: (id) => dispatch({ type: USER_ID_CHANGED, payload: { id } }),
    setColor: (color) =>
      dispatch({ type: USER_COLOR_CHANGED, payload: { color } }),
    setAdmin: (admin) =>
      dispatch({ type: ADMIN_STATUS_CHANGED, payload: { admin } }),
    setShopName: (shopName) =>
      dispatch({ type: USER_SHOPNAME_CHANGED, payload: { shopName } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Authorization);
