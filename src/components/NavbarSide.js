import React from "react";
import { BiShoppingBag } from "react-icons/bi";
// import { Modal, Button } from "react-bootstrap";
import { IconContext } from "react-icons";
import { connect } from "react-redux";
import { TOGGLE_SIDE_BAR } from "../actions/actionsForSite";

const NavbarSide = ({
  setToggleSideBar,
  isBigScreen,
  login,
  username,
  tamzirtapozServer,
}) => {
  return (
    <>
      <nav className="navbar navbar-expand d-flex justify-content-between sticky-top fixed-top NavbarPosition p-0 m-0 align-top ">
        {isBigScreen ? (
          <></>
        ) : (
          <>
            {" "}
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

        <div className="d-flex justify-content-end align-items-center p-1 m-0">
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
              <>{username}</>
            ) : (
              <>
                <button
                  className="btn btn-success m-0 p-0"
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
  const { isBigScreen, toggleSideBar, tamzirtapozServer, login, username } =
    store.site;
  return { isBigScreen, toggleSideBar, tamzirtapozServer, login, username };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setToggleSideBar: () => dispatch({ type: TOGGLE_SIDE_BAR }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavbarSide);
