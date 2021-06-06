import React from "react";
import { connect } from "react-redux";

const SingleProduct = ({
  category,
  subCategory,
  productImageUrl,
  definition,
  screenWidth,
  price,
  priceDecimal,
  title,
  discountPercent,
}) => {
  return (
    <div
      className="container-fluid m-2 p-2"
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
        $
        <span
          className="font-weight-light"
          style={{ textDecoration: "line-through" }}
        >
          {price},{priceDecimal}
        </span>
        <span className="text-success font-weight-bold">{` $${(
          ((Number(price) * 100 + Number(priceDecimal)) *
            ((100 - Number(discountPercent)) / 100)) /
          100
        ).toFixed(2)}`}</span>
      </h3>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { screenWidth } = state.site;
  return { screenWidth };
};

export default connect(mapStateToProps)(SingleProduct);
