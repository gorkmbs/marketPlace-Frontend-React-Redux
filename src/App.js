import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./sidebar.scss";
import "./App.css";
import Sidebar from "./components/Sidebar";

//const urlServer = "https://tamzirtapoz.herokuapp.com";
// const urlServer = "http://localhost:5000";

function App() {
  const [windowWidthSize, setWindowWidthSize] = useState(window.innerWidth);

  const checkSize = () => {
    setWindowWidthSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", checkSize);

    return () => {
      window.removeEventListener("resize", checkSize);
    };
  }, []);

  return (
    <>
      <Router>
        <div className="container-fluid m-0 p-0">
          <Sidebar />
        </div>
        <div
          className="d-flex justify-content-end m-0 p-0 backside"
          style={{ transform: "translate(0px,0px)" }}
        >
          <div
            className="container-fluid m-0 p-0"
            style={{ width: windowWidthSize - 80 }}
          >
            <h1 className="text-left" style={{ zIndex: "1000", color: "red" }}>
              HELLO WORLD FROM TAMZIRTAPOZ MARKET
            </h1>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
