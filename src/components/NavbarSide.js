import React from "react";
import { Link } from "react-router-dom";

const NavbarSide = ({ setToggleSideBar, isBigScreen }) => {
  return (
    <>
      <nav
        className="navbar d-flex justify-content-between sticky-top p-0 m-0 align-top "
        style={{ background: "rgba(10,232,174,1)" }}
      >
        {isBigScreen ? (
          <></>
        ) : (
          <>
            {" "}
            <div className="d-flex justify-content-end align-items-top p-2 m-0">
              <button
                className="btn btn-warning m-0 p-0"
                onClick={() => setToggleSideBar(true)}
              >
                MENU
              </button>
            </div>
          </>
        )}

        <div className="navbar p-0 m-0 d-flex">
          <Link to="/" className="linkWithoutBlueLine">
            <h1 className="navbar-brand pl-1 shadow-lg p-1 mb-1 navTextColor rounded">
              ™zirt@poz
            </h1>
          </Link>
        </div>

        <div className="d-flex justify-content-end align-items-top p-2 m-0">
          MY BAG
        </div>
      </nav>
    </>
  );
};

export default NavbarSide;
