import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./sidebar.scss";
import { Modal, Button } from "react-bootstrap";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { createStore, combineReducers } from "redux";
import NavbarSide from "./components/NavbarSide";
import reducerForSite from "./recucers/reducerForSite";
import reducerForBag from "./recucers/reducerForBag";
import { BIG_SCREEN_STATUS_CHANGE } from "./actions/actionsForSite";
import { Provider } from "react-redux";
import Authorization from "./components/Authorization";
import HomeGeneral from "./components/HomeGeneral";

const rootReducer = combineReducers({
  site: reducerForSite,
  bag: reducerForBag,
});
const store = createStore(rootReducer);

function App() {
  const [pageYOffset, setPageYOffset] = useState("0px");
  const [welcomeMessage, setWelcomeMessage] = useState(true);

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

              <div className="container-fluid m-0 p-0">
                <Switch>
                  <Route exact path="/">
                    <HomeGeneral />
                  </Route>
                  <Route path="/authorization/:id">
                    <Authorization />
                  </Route>
                </Switch>
              </div>
            </div>
          </div>
        </Router>
      </Provider>
      <>
        <Modal
          style={{ background: "rgba(50,50,50,0.2)" }}
          contentClassName="rounded"
          backdrop={true}
          animation="false"
          show={welcomeMessage}
          onHide={() => setWelcomeMessage(false)}
        >
          <Modal.Header className="bg-success">
            <Modal.Title>
              <span className="text-light">
                Welcome to tamzirtapoz Market {":)"}
              </span>
            </Modal.Title>
            <button
              className="btn btn-success m-0 p-0"
              onClick={() => setWelcomeMessage(false)}
            >
              X
            </button>
          </Modal.Header>
          <Modal.Body>you can buy anything that you want !</Modal.Body>
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
        </Modal>
      </>
    </>
  );
}

export default App;
