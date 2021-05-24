import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./sidebar.scss";
import "./App.css";
import Sidebar from "./components/Sidebar";

//const urlServer = "https://tamzirtapoz.herokuapp.com";
// const urlServer = "http://localhost:5000";

function App() {
  return (
    <>
      <Router>
        <div className="app">
          <Sidebar />
          <div className="m-0 p-0">
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
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
