import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  NEW_ITEM_ADDED_TO_BAG,
  REMOVE_ITEM_FROM_BAG,
} from "../actions/actionsForBag";
import { GiShoppingCart } from "react-icons/gi";
import { IconContext } from "react-icons";

const BagItems = ({ bagItems, addNewItemToBag, removeItem }) => {
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
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const { bagItems } = state.bag;
  return { bagItems };
};

const mapDispatchToProps = (dispatch) => {
  return {
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
