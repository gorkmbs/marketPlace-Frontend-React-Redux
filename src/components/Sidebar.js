import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiMenuFill } from "react-icons/ri";
import { IconContext } from "react-icons";
import { AiOutlineCloseCircle } from "react-icons/ai";
import sidebarBg from "../assets/bg1.jpg";
import { GiMeal, GiClothes } from "react-icons/gi";
import { MdComputer, MdPets } from "react-icons/md";
import { connect } from "react-redux";
import { TOGGLE_SIDE_BAR } from "../actions/actionsForSite";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

const Sidebar = ({
  toggleSideBar,
  setToggleSideBar,
  isBigScreen,
  tamzirtapozServer,
}) => {
  const [showSideBar, setShowSideBar] = useState(false);

  const handleOpenSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  const selectHandler = () => {
    setTimeout(() => {
      setShowSideBar(false);
    }, 50);
  };

  const handleToggleSideBar = (value) => {
    setToggleSideBar(value);
    setShowSideBar(false);
  };

  return (
    <>
      {showSideBar && isBigScreen ? (
        <>
          <button
            className="btn btn-danger"
            onClick={() => setShowSideBar(false)}
            style={{
              position: "absolute",
              zIndex: "3500",
              transform: "translate(200px,25px)",
              marginTop: isBigScreen
                ? "0"
                : window.innerHeight > 700
                ? "50px"
                : "0px",
            }}
          >
            <IconContext.Provider
              value={{
                color: "white",
                className: "global-class-name m-0 p-0",
                size: "1.5em",
              }}
            >
              <AiOutlineCloseCircle />
            </IconContext.Provider>
          </button>
        </>
      ) : (
        <></>
      )}

      <ProSidebar
        className="sidebarPosition"
        style={{
          maxHeight: "90vh",
          height: "550px",
          zIndex: "2500",
          marginTop: isBigScreen
            ? "0"
            : window.innerHeight > 700
            ? "50px"
            : "0px",
        }}
        collapsed={!showSideBar}
        toggled={toggleSideBar}
        onToggle={handleToggleSideBar}
        image={sidebarBg}
        breakPoint="md"
      >
        <SidebarHeader>
          <div
            style={{
              padding: "2px",
              textTransform: "lowercase",
              fontWeight: "bold",
              fontSize: 21,
              letterSpacing: "1px",
              overflow: "hidden",
              // textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <div
              className="m-0 p-0 pt-4 d-flex justify-content-center align-items-center"
              style={{ width: "80px" }}
            >
              <button
                className={`btn-link m-0 p-0  ${
                  showSideBar ? "rotate90" : "rotate"
                }`}
                onClick={handleOpenSideBar}
                style={{
                  border: "0px",
                  textDecoration: "none",
                }}
              >
                <div className="m-0 p-0 d-flex justify-content-center align-items-center">
                  <IconContext.Provider
                    value={{
                      color: "rgba(219, 43, 125, 1)",
                      className: "global-class-name m-0 p-0",
                      size: "1.5em",
                    }}
                  >
                    <RiMenuFill />
                  </IconContext.Provider>
                </div>
              </button>
            </div>

            <div className="p-0 m-0 pt-2 text-primary">
              <a
                href={tamzirtapozServer}
                className="m-0 p-0  linkWithoutBlueLine"
                style={{
                  fontSize: "15px",
                  color: "rgba(219, 43, 125, 1)",
                  fontWeight: "lighter",
                  letterSpacing: "0px",
                }}
              >
                ™zirt@poz
              </a>
            </div>
            <Link to="/" className="linkWithoutBlueLine">
              market
            </Link>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem
              onClick={() => {
                selectHandler();
              }}
              icon={
                <IconContext.Provider
                  value={{
                    className: "global-class-name m-0 p-0",
                    size: "2em",
                  }}
                >
                  <GiMeal />
                </IconContext.Provider>
              }
              suffix={<span className="badge red">Fast</span>}
            >
              <Link to="/categories/food">Food</Link>
            </MenuItem>
            <MenuItem
              suffix={<span className="badge yellow">50%</span>}
              onClick={() => {
                selectHandler();
              }}
              icon={
                <IconContext.Provider
                  value={{
                    className: "global-class-name m-0 p-0",
                    size: "2em",
                  }}
                >
                  <GiClothes />
                </IconContext.Provider>
              }
            >
              <Link to="/categories/clothes">Clothes</Link>
            </MenuItem>

            <SubMenu
              prefix={<span className="badge gray">New</span>}
              title="Technology"
              icon={
                <IconContext.Provider
                  value={{
                    className: "global-class-name m-0 p-0",
                    size: "2em",
                  }}
                >
                  <MdComputer />
                </IconContext.Provider>
              }
            >
              <Link
                to="/categories/technology"
                onClick={() => {
                  selectHandler();
                }}
              >
                <MenuItem>Computers</MenuItem>
                <MenuItem>Mobile Phones</MenuItem>
                <MenuItem>Gaming</MenuItem>
              </Link>
            </SubMenu>
            <SubMenu
              title="Pet"
              icon={
                <IconContext.Provider
                  value={{
                    className: "global-class-name m-0 p-0",
                    size: "2em",
                  }}
                >
                  <MdPets />
                </IconContext.Provider>
              }
            >
              <Link
                to="/categories/pet"
                onClick={() => {
                  selectHandler();
                }}
              >
                <MenuItem>Cats</MenuItem>
                <MenuItem>Dogs</MenuItem>
                <MenuItem>Birds</MenuItem>
                <MenuItem>Fish</MenuItem>
              </Link>
            </SubMenu>
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 24px",
            }}
          >
            <a
              href={tamzirtapozServer}
              className="m-0 p-0  linkWithoutBlueLine"
              style={{
                fontSize: "15px",
                color: "rgba(219, 43, 125, 1)",
                fontWeight: "lighter",
                letterSpacing: "0px",
              }}
            >
              <p style={{ transform: "translate(-22px, 0px)" }}>™zirt@poz</p>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
};

const mapStateToProps = (store) => {
  const { toggleSideBar, isBigScreen, tamzirtapozServer } = store.site;
  return { toggleSideBar, isBigScreen, tamzirtapozServer };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setToggleSideBar: () => dispatch({ type: TOGGLE_SIDE_BAR }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
