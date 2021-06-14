import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import {
  NEW_ITEM_ADDED_TO_BAG,
  ALL_PRODUCT_UPDATED,
} from "../actions/actionsForBag";
import { VscLoading } from "react-icons/vsc";
import { GiShoppingCart } from "react-icons/gi";
import { AiOutlineArrowDown } from "react-icons/ai";
import { IconContext } from "react-icons";
import pageFlip from "../soundEffects/pageFlip.mp3";
import doneEffect from "../soundEffects/doneEffect.mp3";
import SingleProduct from "./SingleProduct";
import useSound from "use-sound";

const axios = require("axios");

const ProductPage = ({
  urlServer,
  addNewItemToBag,
  tamzirtapozServer,
  allProducts,
  setAllProducts,
  screenWidth,
  login,
  bagItems,
}) => {
  const { id } = useParams();
  const [dataProduct, setDataProduct] = useState({});
  const [loadingData, setLoadingData] = useState(true);

  const [modalShow, setModalShow] = useState(false);
  const [itemCount, setItemCount] = useState(1);
  const [playPageFlip] = useSound(pageFlip);
  const [playDoneEffect] = useSound(doneEffect);

  useEffect(() => {
    setLoadingData(true);
    axios({
      method: "get",
      url: urlServer + "/market/single-product/" + id,
    })
      .then((response) => {
        if (response.data.success === true) {
          setDataProduct(response.data.product);
          setTimeout(() => {
            setLoadingData(false);
          }, 250);
        } else {
          window.alert("an error occured, please try again later");
        }
      })
      .catch((err) => {
        console.log(err);
        window.alert("an error occured, please try again later");
      });
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (!loadingData) {
      axios({
        method: "post",
        url: urlServer + "/market/all-products",
        data: { type: dataProduct.category.category },
      })
        .then((response) => {
          if (response.data.success) {
            let newArray = response.data.productArray.filter(
              (item) => item._id !== dataProduct._id
            );
            setAllProducts(newArray);
          } else {
          }
        })
        .catch((err) => {
          console.log(err);
          window.alert(err);
        });
    }

    // eslint-disable-next-line
  }, [loadingData]);

  const countChanger = (e, task) => {
    e.preventDefault();
    if (task === "add") {
      if (itemCount > 19 || itemCount > dataProduct.stockCount - 1) {
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
      if (bagItems[i].item._id === dataProduct._id) {
        setItemCount(bagItems[i].count);
      }
    }
    setModalShow(true);
  };

  const handleAddToBag = (e) => {
    e.preventDefault();
    addNewItemToBag(
      {
        ...dataProduct,
      },
      itemCount
    );
    setModalShow(false);
    setItemCount(1);
  };

  return (
    <>
      {loadingData ? (
        <>
          <article>
            <div style={{ height: "30vh" }}></div>
            <div className="d-flex justify-content-center">
              <IconContext.Provider
                value={{
                  color: "green",
                  className: "global-className rotate360",
                  size: "70px",
                }}
              >
                <VscLoading />
              </IconContext.Provider>
            </div>
            <br />
            <div className="d-flex justify-content-center">loading... </div>
            <br />
            <br />
            <div className="d-flex justify-content-center">
              <Link to="/">Back Home</Link>
            </div>
          </article>
        </>
      ) : (
        <>
          <div
            className="container-fluid m-0 p-1"
            style={{ background: "rgba(255,255,0,0.3)" }}
          >
            <div
              className="d-flex justify-content-center m-2 p-2"
              style={{ background: "white" }}
            >
              <div className="container-fluid m-0 p-0">
                <h1 className="text-center text-capitalize">
                  {dataProduct.title}
                </h1>
                <div className="d-flex justify-content-around align-items-center flex-wrap">
                  <div className="">
                    <Link
                      to={`/categories/${dataProduct.category.category}`}
                      className="linkWithoutBlueLine m-0 p-0"
                    >
                      <p className="text-success m-0 p-0">
                        #{dataProduct.category.category}
                      </p>
                    </Link>
                    <Link
                      to={`/categories/${dataProduct.subCategory.subCategory}`}
                      className="linkWithoutBlueLine m-0 p-0"
                    >
                      <p className="text-dark m-0 p-0">
                        #{dataProduct.subCategory.subCategory}
                      </p>
                    </Link>
                    <p
                      className="text-white bg-danger m-1 p-1"
                      style={{
                        position: "absolute",
                        border: "1px",
                        borderStyle: "solid",
                        borderColor: "rgba(0,0,0,0)",
                        borderRadius: "100px",
                        fontSize: "25px",
                      }}
                    >
                      <AiOutlineArrowDown
                        style={{ transform: "translate(0px, -3px)" }}
                      />
                      {dataProduct.discountPercent}%
                    </p>
                    <img
                      src={dataProduct.productImageUrl}
                      alt="Product"
                      className="img-fluid"
                      style={{ maxWidth: "350px" }}
                    />
                  </div>

                  <div className=" m-0 p-0">
                    <h4 className="text-primary">
                      Shop: {dataProduct.shopId.shopName}
                    </h4>
                    <p>Stock: {dataProduct.stockCount}</p>
                    <p>{dataProduct.definition}.</p>
                    <ul>
                      {dataProduct.specifications.map((item, index) => {
                        return (
                          <li key={index}>
                            {item.nameSpec}: {item.specification}
                          </li>
                        );
                      })}
                    </ul>
                    <p>
                      Warranty:{" "}
                      {dataProduct.warranty ? (
                        <>{dataProduct.warrantyExplanation} months available</>
                      ) : (
                        "Non-available"
                      )}
                    </p>
                    <p
                      className="font-weight-light m-0 p-0"
                      style={{
                        textDecoration: "line-through",
                        fontSize: "25px",
                        color: "rgba(255,50,50,0.8)",
                      }}
                    >
                      ${dataProduct.price},{dataProduct.priceDecimal}
                    </p>
                    <p
                      className="font-weight-bold m-0 p-0 text-success"
                      style={{
                        fontSize: "40px",
                      }}
                    >{` $${(
                      ((Number(dataProduct.price) * 100 +
                        Number(dataProduct.priceDecimal)) *
                        ((100 - Number(dataProduct.discountPercent)) / 100)) /
                      100
                    ).toFixed(2)}`}</p>
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-success text-capitalize"
                        onClick={(e) => {
                          playPageFlip();
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
                  </div>
                </div>
              </div>
            </div>
            {allProducts.length > 0 ? (
              <>
                <h1 className="text-center m-1 p-1">Similar Products</h1>
              </>
            ) : (
              <></>
            )}
            <div
              className={`d-flex justify-content-around flex-wrap ${
                screenWidth > 405 ? "m-3 p-3" : "m-0 p-0 mt-4"
              } homeProductList align-items-center`}
            >
              {allProducts.map((item, index) => {
                return <SingleProduct key={index} {...item} />;
              })}
            </div>
          </div>
        </>
      )}
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
              <h4>{dataProduct.title}</h4>
              <p className="m-0 p-1">{dataProduct.definition}</p>
              <p className="m-0 p-1 text-primary">
                Stock: {dataProduct.stockCount}
              </p>

              <div className="container">
                <div className="row">
                  <div className="col">
                    <img
                      src={dataProduct.productImageUrl}
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
                        ${dataProduct.price},{dataProduct.priceDecimal}
                      </p>
                    </div>
                    <div className="col">
                      <p className="text-success font-weight-bold">{` $${(
                        ((Number(dataProduct.price) * 100 +
                          Number(dataProduct.priceDecimal)) *
                          ((100 - Number(dataProduct.discountPercent)) / 100)) /
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
                  <div className="m-0 p-0"></div>
                  <div className="m-0 p-0">
                    <p className="text-dark font-weight-bold m-0 p-0">
                      Total:{" "}
                      {` $${(
                        itemCount *
                        (((Number(dataProduct.price) * 100 +
                          Number(dataProduct.priceDecimal)) *
                          ((100 - Number(dataProduct.discountPercent)) / 100)) /
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
                  playDoneEffect();
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
    </>
  );
};

const mapStateToProps = (store) => {
  const { token, urlServer, login, tamzirtapozServer, screenWidth } =
    store.site;
  const { bagItems, allProducts } = store.bag;
  return {
    token,
    urlServer,
    login,
    bagItems,
    tamzirtapozServer,
    allProducts,
    screenWidth,
  };
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
    setAllProducts: (allProducts) =>
      dispatch({ type: ALL_PRODUCT_UPDATED, payload: { allProducts } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
