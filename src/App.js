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
import {
  BIG_SCREEN_STATUS_CHANGE,
  SCREEN_WIDTH_CHANGED,
} from "./actions/actionsForSite";
import { Provider } from "react-redux";
import Authorization from "./components/Authorization";
import HomeGeneral from "./components/HomeGeneral";
import AddProduct from "./components/AddProduct";
import AddCategory from "./components/AddCategory";
import BagItems from "./components/BagItems";
import CategoryProduct from "./components/CategoryProduct";
import ProductPage from "./components/ProductPage";
import FinishPayment from "./components/FinishPayment";
import OldPurchases from "./components/OldPurchases";

const rootReducer = combineReducers({
  site: reducerForSite,
  bag: reducerForBag,
});
const store = createStore(rootReducer);

function App() {
  const [pageYOffset, setPageYOffset] = useState("0px");
  const [welcomeMessage, setWelcomeMessage] = useState(true);

  const scrolledPage = () => {
    store.dispatch({
      type: SCREEN_WIDTH_CHANGED,
      payload: { width: window.innerWidth },
    });
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
    store.dispatch({
      type: SCREEN_WIDTH_CHANGED,
      payload: { width: window.innerWidth },
    });
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

              <div className="container-fluid m-0 p-0 pt-1">
                <Switch>
                  <Route exact path="/">
                    <HomeGeneral />
                  </Route>
                  <Route path="/add-new-product">
                    <AddProduct />
                  </Route>
                  <Route path="/add-new-category">
                    <AddCategory />
                  </Route>
                  <Route path="/my-bag">
                    <BagItems />
                  </Route>
                  <Route path="/authorization/:id">
                    <Authorization />
                  </Route>
                  <Route path="/categories/:category">
                    <CategoryProduct />
                  </Route>
                  <Route path="/product/:id">
                    <ProductPage />
                  </Route>
                  <Route path="/finish-shopping">
                    <FinishPayment />
                  </Route>
                  <Route path="/old-purchases">
                    <OldPurchases />
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
              <span className="text-light">Welcome to the Market {":)"}</span>
            </Modal.Title>
            <button
              className="btn btn-success m-0 p-0"
              onClick={() => setWelcomeMessage(false)}
            >
              X
            </button>
          </Modal.Header>
          <Modal.Body>I love you honey :)</Modal.Body>
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
