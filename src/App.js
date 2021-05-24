import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./sidebar.scss";
import "./App.css";
import Sidebar from "./components/Sidebar";

import NavbarSide from "./components/NavbarSide";

//const urlServer = "https://tamzirtapoz.herokuapp.com";
// const urlServer = "http://localhost:5000";

function App() {
  const [pageYOffset, setPageYOffset] = useState("0px");
  const [toggleSideBar, setToggleSideBar] = useState(false);
  const [isBigScreen, setIsBigScreen] = useState(false);
  const scrolledPage = () => {
    if (window.innerWidth < 768) {
      setPageYOffset(30);
      setIsBigScreen(false);
    } else {
      setPageYOffset(window.pageYOffset);
      setIsBigScreen(true);
    }
  };

  useEffect(() => {
    if (window.innerWidth < 768) {
      setPageYOffset(30);
      setIsBigScreen(false);
    } else {
      setIsBigScreen(true);
    }
    window.addEventListener("resize", scrolledPage);
    window.addEventListener("scroll", scrolledPage);
    return () => {
      window.removeEventListener("scroll", scrolledPage);
      window.removeEventListener("resize", scrolledPage);
    };
  }, []);

  return (
    <>
      <Router>
        <div className="app">
          <div className="m-0 p-0 sidebarPosition">
            <div style={{ height: pageYOffset }}></div>
            <Sidebar
              toggleSideBar={toggleSideBar}
              setToggleSideBar={setToggleSideBar}
            />
          </div>
          <div className="p-0 backside container-fluid mainBarPosition">
            <NavbarSide
              setToggleSideBar={setToggleSideBar}
              isBigScreen={isBigScreen}
            />
            <h1 className="text-left" style={{ zIndex: "1000", color: "red" }}>
              HELLO WORLD FROM TAMZIRTAPOZ MARKET
            </h1>
            <h1 className="text-left" style={{ zIndex: "1000", color: "blue" }}>
              I AM PREPARING THIS PAGE
            </h1>
            <h1
              className="text-left"
              style={{ zIndex: "1000", color: "black" }}
            >
              IN CLOSE TIME YOU CAN ENTER THE MARKET
            </h1>
            <h1
              className="text-left"
              style={{ zIndex: "1000", color: "black" }}
            >
              IN CLOSE TIME YOU CAN ENTER THE MARKET
            </h1>
            <h1
              className="text-left"
              style={{ zIndex: "1000", color: "black" }}
            >
              IN CLOSE TIME YOU CAN ENTER THE MARKET
            </h1>
            <h1
              className="text-left"
              style={{ zIndex: "1000", color: "black" }}
            >
              IN CLOSE TIME YOU CAN ENTER THE MARKET
            </h1>
            <h1
              className="text-left"
              style={{ zIndex: "1000", color: "black" }}
            >
              IN CLOSE TIME YOU CAN ENTER THE MARKET
            </h1>
            <h1
              className="text-left"
              style={{ zIndex: "1000", color: "black" }}
            >
              IN CLOSE TIME YOU CAN ENTER THE MARKET
            </h1>
            <h1
              className="text-left"
              style={{ zIndex: "1000", color: "black" }}
            >
              IN CLOSE TIME YOU CAN ENTER THE MARKET
            </h1>
            <h1
              className="text-left"
              style={{ zIndex: "1000", color: "black" }}
            >
              IN CLOSE TIME YOU CAN ENTER THE MARKET
            </h1>
            <h1
              className="text-left"
              style={{ zIndex: "1000", color: "black" }}
            >
              IN CLOSE TIME YOU CAN ENTER THE MARKET
            </h1>
            <h1
              className="text-left"
              style={{ zIndex: "1000", color: "black" }}
            >
              IN CLOSE TIME YOU CAN ENTER THE MARKET
            </h1>
            <h1
              className="text-left"
              style={{ zIndex: "1000", color: "black" }}
            >
              IN CLOSE TIME YOU CAN ENTER THE MARKET
            </h1>
            <h1
              className="text-left"
              style={{ zIndex: "1000", color: "black" }}
            >
              IN CLOSE TIME YOU CAN ENTER THE MARKET
            </h1>
            <h1
              className="text-left"
              style={{ zIndex: "1000", color: "black" }}
            >
              IN CLOSE TIME YOU CAN ENTER THE MARKET
            </h1>
            <h1
              className="text-left"
              style={{ zIndex: "1000", color: "black" }}
            >
              IN CLOSE TIME YOU CAN ENTER THE MARKET
            </h1>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
