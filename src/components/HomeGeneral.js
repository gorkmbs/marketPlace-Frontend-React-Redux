import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { connect } from "react-redux";
import SingleProduct from "./SingleProduct";
import { FcNext, FcPrevious } from "react-icons/fc";
import { AiOutlineArrowDown } from "react-icons/ai";
import { IconContext } from "react-icons";

import { homeScreenItems } from "../arrayFiles/homeScreenItems";
import { ALL_PRODUCT_UPDATED } from "../actions/actionsForBag";
import axios from "axios";

const HomeGeneral = ({
  isBigScreen,

  allProducts,
  screenWidth,

  setAllProducts,
  urlServer,
}) => {
  const [indexForSlide, setIndexForSlide] = useState(0);
  const [indexForProduct, setIndexForProduct] = useState(0);

  const [productsLoaded, setProductsLoaded] = useState(false);

  useEffect(() => {
    if (!productsLoaded) {
      axios({
        method: "post",
        url: urlServer + "/market/all-products",
        data: { type: "all" },
      })
        .then((response) => {
          if (response.data.success) {
            setAllProducts(response.data.productArray);
            setProductsLoaded(true);
          } else {
            setProductsLoaded(false);
          }
        })
        .catch((err) => {
          console.log(err);
          window.alert(err);
          setProductsLoaded(false);
        });
    }
    // eslint-disable-next-line
  }, [allProducts]);

  // useEffect(() => {
  //   window.addEventListener("resize", pageSizeChanged);
  //   return () => {
  //     window.removeEventListener("resize", pageSizeChanged);
  //   };
  // });

  const handleSelectForProduct = (selectedIndex, e) => {
    setIndexForProduct(selectedIndex);
  };

  const handleSelect = (selectedIndex, e) => {
    setIndexForSlide(selectedIndex);
  };

  return (
    <>
      <div className="container-fluid m-0 p-0">
        <div className="d-flex flex-wrap justify-content-around align-items-center homeTab">
          {isBigScreen ? (
            <>
              <div
                className="d-flex justify-content-center align-self-center m-0 p-4"
                style={{
                  width: "450px",
                  border: "1px",
                  borderStyle: "solid",
                  borderColor: "rgba(0,0,0,0.3)",
                  borderRadius: "100px 100px 20px 20px",
                }}
              >
                <Carousel
                  activeIndex={indexForProduct}
                  onSelect={handleSelectForProduct}
                  slide={true}
                  interval={2500}
                  fade
                  indicators={true}
                  variant="dark"
                  nextLabel=""
                  nextIcon={
                    <span>
                      <IconContext.Provider
                        value={{
                          className: "global-class-name border-dark bg-dark",
                          size: "2em",
                        }}
                      >
                        <FcNext />
                      </IconContext.Provider>
                    </span>
                  }
                  prevLabel=""
                  prevIcon={
                    <span>
                      <IconContext.Provider
                        value={{
                          className: "global-class-name border-dark bg-dark",
                          size: "2em",
                        }}
                      >
                        <FcPrevious />
                      </IconContext.Provider>
                    </span>
                  }
                >
                  {allProducts.map((item, index) => {
                    return (
                      <Carousel.Item key={item._id}>
                        <h3 className="text-center m-2 p-2">{item.title}</h3>
                        <div
                          className="d-flex justify-content-center text-center"
                          style={{ position: "absolute", width: "450px" }}
                        >
                          <div className="d-flex justify-content-center text-center">
                            <h1
                              className="text-white bg-danger"
                              style={{
                                border: "1px",
                                borderStyle: "solid",
                                borderColor: "rgba(0,0,0,0)",
                                borderRadius: "100px",
                              }}
                            >
                              <AiOutlineArrowDown
                                style={{ transform: "translate(0px, -3px)" }}
                              />
                              {item.discountPercent}%
                            </h1>
                          </div>
                        </div>
                        <div
                          className="d-flex justify-content-center align-items-center m-0 p-0"
                          style={{ height: "250px", width: "450px" }}
                        >
                          <img
                            onClick={() => {
                              // window.location.reload();
                            }}
                            key={item._id}
                            className="img-fluid rounded"
                            style={{ height: "250px" }}
                            src={item.productImageUrl}
                            alt={`${item._id} slide`}
                          />
                        </div>
                      </Carousel.Item>
                    );
                  })}
                </Carousel>
              </div>
            </>
          ) : (
            <></>
          )}

          <div
            className="container-fluid m-0  p-1 homeSlideItems border border-secondary"
            style={{
              borderRadius: "15px",
              maxWidth: "600px",
              width: "90vw",

              background: "rgba(50,50,150,0.2)",
            }}
          >
            <h1 className="text-center text-uppercase m-0 p-0">
              {homeScreenItems[indexForSlide].header}
            </h1>
            <Carousel
              activeIndex={indexForSlide}
              onSelect={handleSelect}
              slide={true}
              fade
              indicators={true}
              variant="dark"
              nextLabel=""
              nextIcon={
                <span>
                  {/* <IconContext.Provider
                    value={{
                      className: "global-class-name border-dark bg-dark",
                      size: "2em",
                    }}
                  >
                    <FcNext />
                  </IconContext.Provider> */}
                </span>
              }
              prevLabel=""
              prevIcon={
                <span>
                  {/* <IconContext.Provider
                    value={{
                      className: "global-class-name border-dark bg-dark",
                      size: "2em",
                    }}
                  >
                    <FcPrevious />
                  </IconContext.Provider> */}
                </span>
              }
            >
              {homeScreenItems.map((item, index) => {
                return (
                  <Carousel.Item key={item.id}>
                    <div className="container-fluid m-0 p-0">
                      <Link to={`/categories/` + item.header}>
                        <img
                          onClick={() => {
                            // window.location.reload();
                          }}
                          key={item.id}
                          className="img-fluid rounded"
                          src={item.img}
                          alt={`${item.id} slide`}
                        />
                      </Link>
                    </div>
                  </Carousel.Item>
                );
              })}
            </Carousel>
            <div className="d-flex justify-content-around flex-wrap m-1 p-1">
              {homeScreenItems.map((item) => {
                return (
                  <Link to={`/categories/` + item.header} key={item.id}>
                    <button
                      onMouseOver={() => setIndexForSlide(item.id - 1)}
                      key={item.id}
                      className="m-1 p-1"
                      style={{
                        color:
                          item.id - 1 === indexForSlide
                            ? "rgba(150,255,150,1)"
                            : "rgba(0,0,0,1)",
                        borderColor:
                          item.id - 1 === indexForSlide
                            ? "rgba(0,0,0,1)"
                            : "rgba(0,0,0,0.5)",
                        borderRadius: "15px",
                        background:
                          item.id - 1 === indexForSlide
                            ? "rgba(3, 67, 97,1)"
                            : "rgba(53,244,244,0.3)",
                        boxShadow:
                          item.id - 1 === indexForSlide
                            ? "5px 7px 5px rgba(55, 50, 50, 0.5)"
                            : "0px 10px 5px rgba(55, 50, 50, 0)",
                      }}
                    >
                      {item.header}
                    </button>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
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
  );
};

const mapStateToProps = (state) => {
  const { isBigScreen, urlServer, screenWidth } = state.site;
  const { allProducts } = state.bag;
  return { isBigScreen, allProducts, urlServer, screenWidth };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAllProducts: (allProducts) =>
      dispatch({ type: ALL_PRODUCT_UPDATED, payload: { allProducts } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeGeneral);
