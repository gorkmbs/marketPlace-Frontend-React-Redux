import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./sidebar.scss";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { createStore, combineReducers } from "redux";
import NavbarSide from "./components/NavbarSide";
import reducerForSite from "./recucers/reducerForSite";
import reducerForBag from "./recucers/reducerForBag";
import { BIG_SCREEN_STATUS_CHANGE } from "./actions/actionsForSite";
import { Provider } from "react-redux";

//const urlServer = "https://tamzirtapoz.herokuapp.com";
// const urlServer = "http://localhost:5000";

const rootReducer = combineReducers({
  site: reducerForSite,
  bag: reducerForBag,
});
const store = createStore(rootReducer);

function App() {
  const [pageYOffset, setPageYOffset] = useState("0px");

  const scrolledPage = () => {
    if (window.innerWidth <= 768) {
      setPageYOffset(0);

      store.dispatch({
        type: BIG_SCREEN_STATUS_CHANGE,
        payload: { status: false },
      });
    } else {
      setPageYOffset(window.pageYOffset);

      store.dispatch({
        type: BIG_SCREEN_STATUS_CHANGE,
        payload: { status: true },
      });
    }
  };

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setPageYOffset(0);

      store.dispatch({
        type: BIG_SCREEN_STATUS_CHANGE,
        payload: { status: false },
      });
    } else {
      store.dispatch({
        type: BIG_SCREEN_STATUS_CHANGE,
        payload: { status: true },
      });
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
      <Provider store={store}>
        <Router>
          {!store.getState().site.isBigScreen ? (
            <>
              <NavbarSide />
            </>
          ) : (
            <></>
          )}
          <div style={{ height: "40px" }}></div>
          <div className="app bg-dark">
            <div className="m-0 p-0 sidebarPosition">
              <div style={{ height: pageYOffset }}></div>
              <Sidebar />
            </div>
            <div className="p-0 m-0 backside container-fluid mainBarPosition">
              {store.getState().site.isBigScreen ? (
                <>
                  <NavbarSide />
                </>
              ) : (
                <></>
              )}

              <h1
                className="text-left"
                style={{ zIndex: "1000", color: "red" }}
              >
                HELLO WORLD FROM TAMZIRTAPOZ MARKET
              </h1>
              <h1
                className="text-left"
                style={{ zIndex: "1000", color: "blue" }}
              >
                I AM PREPARING THIS PAGE
              </h1>
              <h1
                className="text-left"
                style={{ zIndex: "1000", color: "black" }}
              >
                REDUX ACTIVE
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
      </Provider>
    </>
  );
}

export default App;
