import React from "react";
import { connect } from "react-redux";
import { TOGGLE_SIDE_BAR } from "../actions/actionsForSite";

const NavbarSide = ({ setToggleSideBar, isBigScreen, toggleSideBar }) => {
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
          <a
            href="https://tamzirtapoz.netlify.app"
            className="m-0 p-0  linkWithoutBlueLine"
          >
            <h1 className="navbar-brand pl-1 shadow-lg p-1 mb-1 navTextColor rounded">
              ™zirt@poz
            </h1>
          </a>
        </div>

        <div className="d-flex justify-content-end align-items-top p-2 m-0">
          MY BAG
        </div>
      </nav>
    </>
  );
};

const mapStateToProps = (store) => {
  const { isBigScreen, toggleSideBar } = store.site;
  return { isBigScreen, toggleSideBar };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setToggleSideBar: () => dispatch({ type: TOGGLE_SIDE_BAR }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavbarSide);
