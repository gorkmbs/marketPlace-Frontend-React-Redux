import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { homeScreenItems } from "../arrayFiles/homeScreenItems";
import { connect } from "react-redux";
import { ALL_PRODUCT_UPDATED } from "../actions/actionsForBag";
import SingleProduct from "./SingleProduct";

const axios = require("axios");

const CategoryProduct = ({
  allProducts,
  urlServer,
  setAllProducts,
  screenWidth,
}) => {
  const { category } = useParams();
  const [categoryItem, setCategoryItem] = useState(
    homeScreenItems.filter((item) => item.header === category)[0]
  );

  useEffect(() => {
    setCategoryItem(
      homeScreenItems.filter((item) => item.header === category)[0]
    );
    window.scrollTo({ left: 0, top: 0 });
  }, [category]);

  useEffect(() => {
    axios({
      method: "post",
      url: urlServer + "/market/all-products",
      data: { type: categoryItem.header },
    })
      .then((response) => {
        if (response.data.success) {
          setAllProducts(response.data.productArray);
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
        window.alert(err);
      });

    // eslint-disable-next-line
  }, [categoryItem]);

  return (
    <>
      <div
        className="container-fluid p-2"
        style={{ background: "rgba(0,255,255,0.1)" }}
      >
        <h1 className="text-center text-capitalize">{categoryItem.header}</h1>
        <div className="d-flex justify-content-center">
          <img
            src={categoryItem.img}
            alt={category}
            style={{ maxHeight: "300px" }}
          />
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
    </>
  );
};

const mapStateToProps = (state) => {
  const { login, token, urlServer, screenWidth } = state.site;
  const { allProducts } = state.bag;
  return { allProducts, login, token, urlServer, screenWidth };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAllProducts: (allProducts) =>
      dispatch({ type: ALL_PRODUCT_UPDATED, payload: { allProducts } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryProduct);
