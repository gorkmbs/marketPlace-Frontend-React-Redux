import React, { useState } from "react";
import { RiMenuFill } from "react-icons/ri";
import { IconContext } from "react-icons";
import sidebarBg from "../assets/bg1.jpg";
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
import {
  FaTachometerAlt,
  FaGem,
  FaList,
  FaGithub,
  FaRegLaughWink,
  FaHeart,
} from "react-icons/fa";

const Sidebar = ({ toggleSideBar, setToggleSideBar, isBigScreen }) => {
  const [showSideBar, setShowSideBar] = useState(false);

  const handleOpenSideBar = () => {
    setShowSideBar(!showSideBar);
  };
  const handleToggleSideBar = (value) => {
    setToggleSideBar(value);
    setShowSideBar(false);
  };

  return (
    <>
      <ProSidebar
        className="sidebarPosition"
        style={{
          maxHeight: "90vh",
          height: "550px",
          marginTop: isBigScreen
            ? "0"
            : window.innerHeight > 800
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
                href="https://tamzirtapoz.netlify.app"
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
            <p>market</p>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem
              icon={<FaTachometerAlt />}
              suffix={<span className="badge red">asd</span>}
            >
              asd
            </MenuItem>
            <MenuItem icon={<FaGem />}> asd</MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <SubMenu
              suffix={<span className="badge yellow">3</span>}
              title="asd"
              icon={<FaRegLaughWink />}
            >
              <MenuItem> 1</MenuItem>
              <MenuItem> 2</MenuItem>
              <MenuItem> 3</MenuItem>
            </SubMenu>
            <SubMenu
              prefix={<span className="badge gray">3</span>}
              title="asd"
              icon={<FaHeart />}
            >
              header
              <MenuItem> 1</MenuItem>
              <MenuItem> 2</MenuItem>
              <MenuItem> 3</MenuItem>
            </SubMenu>
            <SubMenu title="asd" icon={<FaList />}>
              <MenuItem>1 </MenuItem>
              <MenuItem> 2 </MenuItem>
              <SubMenu title="asd">
                <MenuItem>3.1 </MenuItem>
                <MenuItem>3.2 </MenuItem>
                <SubMenu title="asd">
                  <MenuItem>3.3.1 </MenuItem>
                  <MenuItem>3.3.2 </MenuItem>
                  <MenuItem>3.3.3 </MenuItem>
                </SubMenu>
              </SubMenu>
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
              href="https://github.com/azouaoui-med/react-pro-sidebar"
              target="_blank"
              className="sidebar-btn"
              rel="noopener noreferrer"
            >
              <FaGithub />
              <span>asd</span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
};

const mapStateToProps = (store) => {
  const { toggleSideBar, isBigScreen } = store.site;
  return { toggleSideBar, isBigScreen };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setToggleSideBar: () => dispatch({ type: TOGGLE_SIDE_BAR }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
