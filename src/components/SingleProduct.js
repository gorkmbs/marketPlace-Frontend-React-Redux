import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { NEW_ITEM_ADDED_TO_BAG } from "../actions/actionsForBag";
import { Modal, Button } from "react-bootstrap";
import { GiShoppingCart } from "react-icons/gi";
import { IconContext } from "react-icons";

const SingleProduct = ({
  category,
  _id,
  subCategory,
  productImageUrl,
  definition,
  stockCount,
  price,
  priceDecimal,
  title,
  discountPercent,
  login,
  screenWidth,
  addNewItemToBag,
  tamzirtapozServer,
  bagItems,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [itemCount, setItemCount] = useState(1);

  const countChanger = (e, task) => {
    e.preventDefault();
    if (task === "add") {
      if (itemCount > 19 || itemCount > stockCount - 1) {
        window.alert("You reached the maximum limit");
      } else {
        setItemCount(itemCount + 1);
      }
    } else if (task === "sub") {
      if (itemCount === 1) {
      } else {
        setItemCount(itemCount - 1);
      }
    }
  };

  const handleLoginOrRegister = (e, task) => {
    e.preventDefault();
    if (task === "register") {
      window.location = tamzirtapozServer + "/register";
    } else if (task === "login") {
      window.location = tamzirtapozServer + "/login";
    }
  };

  const addRequest = (e) => {
    e.preventDefault();
    for (let i = 0; i < bagItems.length; i++) {
      if (bagItems[i].item._id === _id) {
        setItemCount(bagItems[i].count);
      }
    }
    setModalShow(true);
  };

  const handleAddToBag = (e) => {
    e.preventDefault();
    addNewItemToBag(
      {
        category,
        _id,
        subCategory,
        productImageUrl,
        definition,
        stockCount,
        price,
        priceDecimal,
        title,
        discountPercent,
      },
      itemCount
    );
    setModalShow(false);
    setItemCount(1);
  };

  return (
    <>
      {login ? (
        <>
          <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            show={modalShow}
            style={{ background: "rgba(0,188,212,0.3)" }}
            onHide={() => {
              setModalShow(false);
            }}
            centered
          >
            <Modal.Header closeButton closeLabel="">
              <Modal.Title id="contained-modal-title-vcenter">
                You are adding a new item to bag
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>{title}</h4>
              <p className="m-0 p-1">{definition}</p>
              <p className="m-0 p-1 text-primary">Stock: {stockCount}</p>

              <div className="container">
                <div className="row">
                  <div className="col">
                    <img
                      src={productImageUrl}
                      alt="Product"
                      className="img-fluid"
                      style={{ maxHeight: "300px", minWidth: "150px" }}
                    />
                  </div>
                  <div className="col">
                    <div className="col">Price</div>
                    <div className="col">
                      <p
                        className="font-weight-light m-0 p-0"
                        style={{
                          textDecoration: "line-through",
                          color: "rgba(255,50,50,0.8)",
                        }}
                      >
                        ${price},{priceDecimal}
                      </p>
                    </div>
                    <div className="col">
                      <p className="text-success font-weight-bold">{` $${(
                        ((Number(price) * 100 + Number(priceDecimal)) *
                          ((100 - Number(discountPercent)) / 100)) /
                        100
                      ).toFixed(2)}`}</p>
                    </div>
                  </div>
                  <div className="col">
                    <div className="row">Count</div>
                    <div className="row">
                      <div className="col d-flex m-2 p-2 justify-content-center align-items-center">
                        {itemCount}
                      </div>
                      <div className="col" style={{ maxWidth: "30px" }}>
                        <div className="row">
                          <button
                            className="btn btn-success m-1 p-1"
                            onClick={(e) => {
                              countChanger(e, "add");
                            }}
                          >
                            +
                          </button>
                        </div>

                        <div className="row">
                          <button
                            className="btn btn-danger m-1 p-1"
                            onClick={(e) => {
                              countChanger(e, "sub");
                            }}
                          >
                            -
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between m-2 p-2">
                  <div className="m-0 p-0">
                    <Link
                      to={`/product/${_id}`}
                      className="text-primary font-weight-bold m-2 p-2"
                    >
                      Product Page
                    </Link>
                  </div>
                  <div className="m-0 p-0">
                    <p className="text-dark font-weight-bold m-0 p-0">
                      Total:{" "}
                      {` $${(
                        itemCount *
                        (((Number(price) * 100 + Number(priceDecimal)) *
                          ((100 - Number(discountPercent)) / 100)) /
                          100)
                      ).toFixed(2)}`}
                    </p>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="text-capitalize"
                onClick={(e) => {
                  handleAddToBag(e);
                }}
              >
                <IconContext.Provider
                  value={{
                    color: "rgb(53,244,244)",
                    className: "global-class-name",
                    size: "20px",
                  }}
                >
                  <GiShoppingCart />
                </IconContext.Provider>{" "}
                add to bag
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <>
          <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            show={modalShow}
            style={{ background: "rgba(0,255,50,0.3)" }}
            onHide={() => {
              setModalShow(false);
            }}
            centered
          >
            <Modal.Header closeButton closeLabel="">
              <Modal.Title id="contained-modal-title-vcenter">
                Login or register please to add this product to your bag
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Registering only takes 1 minute...</p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="warning"
                onClick={(e) => {
                  handleLoginOrRegister(e, "register");
                }}
              >
                Register
              </Button>
              <Button
                variant="success"
                onClick={(e) => {
                  handleLoginOrRegister(e, "login");
                }}
              >
                Login
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
      <div
        className={`container-fluid bottomToTop ${
          screenWidth > 630 ? "m-3 p-2" : "m-0 mb-4 p-0"
        }`}
        style={{
          width: screenWidth > 620 ? "250px" : "150px",
          background: "white",
          // border: "5px double rgba(0,0,255,0.3)",
        }}
      >
        <div className="d-flex justify-content-between flex-wrap m-1 p-1">
          <h6 className="text-white bg-success m-0 p-1">{category.category}</h6>
          <h6 className="text-white bg-dark m-0 p-1">
            {subCategory.subCategory}
          </h6>
        </div>
        <p
          className="m-0 p-1 bg-danger text-white"
          style={{ position: "absolute" }}
        >
          {discountPercent}%
        </p>
        <img
          src={productImageUrl}
          alt="Product"
          className="img img-fluid rounded"
          style={{ border: "5px dotted rgba(100,100,0,0.3)" }}
        />

        <h4 className="text-primary m-1 p-1">{title}</h4>
        <h6 className="text-dark m-0 p-0">{definition}</h6>
        <h3 className="text-dark m-0 p-1">
          <span
            className="font-weight-light"
            style={{
              textDecoration: "line-through",
              color: "rgba(255,50,50,0.8)",
            }}
          >
            ${price},{priceDecimal}
          </span>
          <span className="text-success font-weight-bold">{` $${(
            ((Number(price) * 100 + Number(priceDecimal)) *
              ((100 - Number(discountPercent)) / 100)) /
            100
          ).toFixed(2)}`}</span>
        </h3>
        <button
          className="btn btn-success text-capitalize"
          onClick={(e) => {
            addRequest(e);
          }}
        >
          <IconContext.Provider
            value={{
              color: "rgb(53,244,244)",
              className: "global-class-name",
              size: "20px",
            }}
          >
            <GiShoppingCart />
          </IconContext.Provider>{" "}
          add to bag
        </button>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const { screenWidth, login, tamzirtapozServer } = state.site;
  const { bagItems } = state.bag;
  return { screenWidth, login, tamzirtapozServer, bagItems };
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
