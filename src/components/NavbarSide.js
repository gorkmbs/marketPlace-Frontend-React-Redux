import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { BiShoppingBag } from "react-icons/bi";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import { IconContext } from "react-icons";
import { connect } from "react-redux";

import {
  TOGGLE_SIDE_BAR,
  LOGIN_STATUS_CHANGED,
  TOKEN_CHANGED,
  USERNAME_CHANGED,
  ADMIN_STATUS_CHANGED,
  USER_SHOPNAME_CHANGED,
  USER_COLOR_CHANGED,
  USER_ID_CHANGED,
} from "../actions/actionsForSite";

const Cookie = require("js-cookie");
const axios = require("axios");

const NavbarSide = ({
  setToggleSideBar,
  isBigScreen,
  login,
  setAdmin,
  username,
  setShopName,
  id,
  setId,
  tamzirtapozServer,
  admin,
  setLogin,
  color,
  token,
  urlServer,
  setColor,
  setToken,
  setUsername,
}) => {
  const logOut = () => {
    Cookie.remove("Authorization");
    Cookie.remove("Info");
    axios({
      method: "get",
      url: urlServer + "/users/log-out",
      headers: { Authorization: token },
    })
      .then((response) => {
        if (response.data.success === true) {
          setLogin(false);
          setUsername("");
          setToken("");
          setColor("");
          setId("");
          setAdmin("");
          window.location = tamzirtapozServer + "/goodbye";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (
      !login &&
      !(
        Cookie.get("Authorization") === "" ||
        Cookie.get("Authorization") === undefined
      )
    ) {
      axios({
        method: "post",
        url: urlServer + "/users/protected",
        headers: { Authorization: Cookie.get("Authorization") },
      })
        .then(function (response) {
          // console.log(response.data);
          // handle success
          // console.log(response.data.success);
          if (response.data.success === true) {
            console.log("response" + response.data.success);
            setLogin(response.data.success);
            setUsername(response.data.username);
            setToken(response.data.token);
            setColor(response.data.color);
            setId(response.data.id);
            setAdmin(response.data.admin);
            setShopName(response.data.shopName);
            // setId(response.data.id);
            // setColor(response.data.color);
            // setAdmin(response.data.admin);
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
          } else {
            Cookie.remove("Info");
            Cookie.remove("Authorization");
          }
        })
        .catch(function (error) {
          // handle error
          // setServerSideError(true);
          console.log(error);
        });
    }

    return () => {};
    // eslint-disable-next-line
  }, [login]);

  return (
    <>
      <nav className="navbar navbar-expand d-flex flex-wrap justify-content-between sticky-top fixed-top NavbarPosition p-0 m-0 align-top ">
        {isBigScreen ? (
          <></>
        ) : (
          <>
            <div className="d-flex justify-content-end align-items-top p-2 m-0">
              <button
                className="btn btn-warning m-0 p-0"
                onClick={() => setToggleSideBar()}
              >
                MENU
              </button>
            </div>
          </>
        )}

        <div className="navbar p-0 m-0 d-flex">
          <a href={tamzirtapozServer} className="m-0 p-0  linkWithoutBlueLine">
            <h1 className="navbar-brand pl-1 shadow-lg p-1 mb-1 navTextColor rounded">
              ™zirt@poz
            </h1>
          </a>
        </div>

        <div className="d-flex justify-content-end align-items-center p-0 m-0">
          <IconContext.Provider
            value={{
              color: "rgb(53,244,244)",
              className: "global-class-name",
              size: "30px",
            }}
          >
            <BiShoppingBag />
          </IconContext.Provider>
          <div className="m-0 p-1 ">
            {login ? (
              <>
                <Dropdown
                  as={ButtonGroup}
                  key="success"
                  id="dropdown-variants-primary"
                  variant="dark"
                  className="m-0 p-0"
                >
                  <Dropdown.Toggle
                    variant="dark"
                    id="dropdown-custom-1"
                    // style={{ background: "rgba(0,0,0,0)" }}
                  >
                    {username}
                  </Dropdown.Toggle>

                  <Dropdown.Menu
                    className="dropdown"
                    style={{
                      background: `${color.substring(
                        0,
                        color.length - 1
                      )}, 0.9)`,
                    }}
                  >
                    <div className="dropdown-item">
                      <div className=" d-flex justify-content-center bg-dark">
                        <button
                          className=" btn btn-dark p-0 m-0 d-flex text-primary"
                          onClick={() => {
                            window.location = `${tamzirtapozServer}/profile/${id}`;
                          }}
                        >
                          My Profile
                        </button>
                      </div>
                    </div>

                    <div className="dropdown-item">
                      <Link
                        to={`/add-new-product`}
                        className="linkWithoutBlueLine"
                      >
                        <div className="bg-dark p-0 m-0 d-flex justify-content-center">
                          Sell Product
                        </div>
                      </Link>
                    </div>
                    {admin ? (
                      <div className="dropdown-item">
                        <Link
                          to={`/add-new-category`}
                          className="linkWithoutBlueLine"
                        >
                          <div className="bg-dark p-0 m-0 d-flex justify-content-center">
                            Add Category (Admin)
                          </div>
                        </Link>
                      </div>
                    ) : (
                      <></>
                    )}
                    <div className="dropdown-item">
                      <Link to={`/lottery`} className="linkWithoutBlueLine">
                        <div className="bg-dark p-0 m-0 d-flex justify-content-center">
                          Lottery
                        </div>
                      </Link>
                    </div>
                    <Dropdown.Divider />
                    <Dropdown.Item style={{ background: "grey" }} eventKey="4">
                      <div className="p-0 m-0 d-flex justify-content-center">
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={logOut}
                        >
                          Log Out
                        </button>
                      </div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>
                <button
                  className="btn btn-success m-0 p-2"
                  onClick={() => {
                    window.location = tamzirtapozServer + "/login";
                  }}
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
      {/* <Modal
        style={{ background: "rgba(50,50,50,0.2)" }}
        backdrop={true}
        show={welcomeMessage}
        onHide={() => setWelcomeMessage(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <span className="text-warning">
              Welcome to tamzirtapoz Market {":)"}
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span className="text-primary">{username}</span>, you can buy anything
          that you want !
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              setWelcomeMessage(false);
            }}
          >
            Start Shopping
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
};

const mapStateToProps = (store) => {
  const {
    isBigScreen,
    toggleSideBar,
    tamzirtapozServer,
    login,
    username,
    urlServer,
    token,
    admin,
    id,
    color,
  } = store.site;
  return {
    isBigScreen,
    toggleSideBar,
    admin,
    tamzirtapozServer,
    token,
    login,
    username,
    urlServer,
    id,
    color,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setToggleSideBar: () => dispatch({ type: TOGGLE_SIDE_BAR }),
    setLogin: (login) =>
      dispatch({ type: LOGIN_STATUS_CHANGED, payload: { login } }),
    setToken: (token) => dispatch({ type: TOKEN_CHANGED, payload: { token } }),
    setUsername: (username) =>
      dispatch({ type: USERNAME_CHANGED, payload: { username } }),
    setColor: (color) =>
      dispatch({ type: USER_COLOR_CHANGED, payload: { color } }),
    setId: (id) => dispatch({ type: USER_ID_CHANGED, payload: { id } }),
    setAdmin: (admin) =>
      dispatch({ type: ADMIN_STATUS_CHANGED, payload: { admin } }),
    setShopName: (shopName) =>
      dispatch({ type: USER_SHOPNAME_CHANGED, payload: { shopName } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavbarSide);
