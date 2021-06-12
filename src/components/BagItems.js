import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  FINISH_BUTTON_CLICKED,
  NEW_ITEM_ADDED_TO_BAG,
  REMOVE_ITEM_FROM_BAG,
} from "../actions/actionsForBag";
import { GiShoppingCart } from "react-icons/gi";
import { IconContext } from "react-icons";

const BagItems = ({
  bagItems,
  addNewItemToBag,
  removeItem,
  screenWidth,
  clickFinishButton,
}) => {
  const [pageUpped, setPageUpped] = useState(false);

  // eslint-disable-next-line
  useEffect(() => {
    if (!pageUpped) {
      setTimeout(() => {
        window.scrollTo({ left: 0, top: -100 });
      }, 150);
      setPageUpped(true);
    }
  });

  const countChanger = (e, task, item) => {
    e.preventDefault();
    if (task === "add") {
      if (item.count > 19 || item.count > item.item.stockCount - 1) {
        window.alert("You reached the maximum limit");
      } else {
        addNewItemToBag(item.item, item.count + 1);
      }
    } else if (task === "sub") {
      if (item.count === 1) {
      } else {
        addNewItemToBag(item.item, item.count - 1);
      }
    }
  };

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center m-0 p-0"
        style={{ background: "rgba(50,50,255,0.1)" }}
      >
        <div className="container-fluid m-1 p-1">
          <h1 className="text-center m-1 p-1">
            MY BAG{" "}
            <IconContext.Provider
              value={{
                color: "rgb(15,150,150)",
                className: "global-class-name",
              }}
            >
              <GiShoppingCart />
            </IconContext.Provider>
          </h1>
          {bagItems.length === 0 ? (
            <>
              <div style={{ height: "10vh" }}></div>
              <div className="d-flex justify-content-center m-2 p-2">
                Your bag is empty !
              </div>
              <div className="d-flex justify-content-center m-2 p-2">
                <Link to="/">Go Main Page</Link>
              </div>
            </>
          ) : (
            <></>
          )}
          {bagItems.map((item, index) => {
            return (
              <>
                {index > 0 ? (
                  <div style={{ height: "3px", background: "blue" }}></div>
                ) : (
                  <></>
                )}

                <div className="d-flex justify-content-center m-0 p-0">
                  <div className="container-fluid m-1 p-1 bg-white">
                    <h4>{item.item.title}</h4>
                    <p className="m-0 p-1">{item.item.definition}</p>
                    <p className="m-0 p-1 text-primary">
                      Stock: {item.item.stockCount}
                    </p>

                    <div className="container">
                      <div className="row">
                        <div className="col">
                          <img
                            src={item.item.productImageUrl}
                            alt="Product"
                            className="img-fluid"
                            style={{ maxHeight: "300px", minWidth: "150px" }}
                          />
                        </div>
                        <div className="col">
                          <div className="row">Price</div>
                          <div className="row">
                            <p
                              className="font-weight-light m-0 p-2"
                              style={{
                                textDecoration: "line-through",
                                color: "rgba(255,50,50,0.8)",
                              }}
                            >
                              ${item.item.price},{item.item.priceDecimal}
                            </p>
                          </div>
                          <div className="row">
                            <p className="text-success font-weight-bold m-0 p-2">{`$${(
                              ((Number(item.item.price) * 100 +
                                Number(item.item.priceDecimal)) *
                                ((100 - Number(item.item.discountPercent)) /
                                  100)) /
                              100
                            ).toFixed(2)}`}</p>
                          </div>
                        </div>
                        <div className="col">
                          <div className="row">Count</div>
                          <div className="row">
                            <div
                              className="col d-flex m-2 p-2 justify-content-center align-items-center"
                              style={{ fontSize: "30px" }}
                            >
                              {item.count}
                            </div>
                            <div className="col" style={{ maxWidth: "30px" }}>
                              <div className="row">
                                <button
                                  className="btn btn-success m-1 p-1"
                                  onClick={(e) => {
                                    countChanger(e, "add", item);
                                  }}
                                >
                                  +
                                </button>
                              </div>

                              <div className="row">
                                <button
                                  className="btn btn-warning m-1 p-1"
                                  onClick={(e) => {
                                    countChanger(e, "sub", item);
                                  }}
                                >
                                  -
                                </button>
                              </div>
                            </div>
                            <div className="row">
                              <div className="d-flex justify-content-end">
                                <button
                                  className="btn btn-danger"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    removeItem(item.item._id);
                                  }}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex justify-content-between m-2 p-2">
                        <div className="m-0 p-0">
                          <Link
                            to={`/product/${item.item._id}`}
                            className="text-primary font-weight-bold m-0 p-0"
                          >
                            Product Page
                          </Link>
                        </div>
                        <div className="m-0 p-0">
                          <p className="text-dark font-weight-bold m-0 p-0">
                            Section Total:{" "}
                            {` $${(
                              item.count *
                              (((Number(item.item.price) * 100 +
                                Number(item.item.priceDecimal)) *
                                ((100 - Number(item.item.discountPercent)) /
                                  100)) /
                                100)
                            ).toFixed(2)}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
          {bagItems.length > 0 ? (
            <>
              <footer className="fixed-bottom">
                <div
                  className="d-flex justify-content-center m-0 p-2"
                  style={{
                    background: "rgba(0,0,255,0.3)",
                    width: screenWidth < 769 ? "100vw" : screenWidth - 80,
                    height: "15vh",
                    zIndex: "-220",
                    transform: screenWidth < 769 ? "" : "translate(80px , 0px)",
                  }}
                >
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                      background: "rgba(255,255,200,1)",
                      width: "45vw",
                      fontSize: screenWidth < 769 ? "20px" : "3vw",
                    }}
                  >
                    Total: $
                    {bagItems.reduce((total, item) => {
                      total += item.count;
                      return total;
                    }, 0) === 0 ? (
                      <>0</>
                    ) : (
                      <>
                        {bagItems
                          .reduce((total, item) => {
                            total +=
                              item.count *
                              (((Number(item.item.price) * 100 +
                                Number(item.item.priceDecimal)) *
                                ((100 - Number(item.item.discountPercent)) /
                                  100)) /
                                100);

                            return total;
                          }, 0)
                          .toFixed(2)}
                      </>
                    )}
                  </div>
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                      background: "rgba(0,250,55,1)",
                      width: "45vw",
                      fontSize: screenWidth < 769 ? "20px" : "4vw",
                      border: "2px",
                      borderStyle: "solid",
                      borderColor: "rgba(255,255,255,1)",
                      borderRadius: "20px 80px 80px 20px",
                    }}
                  >
                    <Link
                      to="/finish-shopping"
                      className="linkWithoutBlueLine"
                      onClick={() => {
                        clickFinishButton();
                      }}
                    >
                      <p
                        className="m-1 p-1 text-center"
                        style={{ fontSize: screenWidth < 769 ? "20px" : "4vw" }}
                      >
                        Finish Shopping
                      </p>
                    </Link>
                  </div>
                </div>
              </footer>
            </>
          ) : (
            <></>
          )}

          <div style={{ height: "20vh" }}></div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const { screenWidth } = state.site;
  const { bagItems } = state.bag;
  return { bagItems, screenWidth };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clickFinishButton: () => {
      dispatch({ type: FINISH_BUTTON_CLICKED });
    },
    addNewItemToBag: (item, count) => {
      dispatch({
        type: NEW_ITEM_ADDED_TO_BAG,
        payload: {
          item,
          count,
        },
      });
    },
    removeItem: (_id) => {
      dispatch({
        type: REMOVE_ITEM_FROM_BAG,
        payload: {
          _id,
        },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BagItems);
