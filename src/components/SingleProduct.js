import React, { useState } from "react";
import { connect } from "react-redux";
import { NEW_ITEM_ADDED_TO_BAG } from "../actions/actionsForBag";
import { Modal, Button } from "react-bootstrap";

const SingleProduct = ({
  category,
  subCategory,
  productImageUrl,
  definition,
  screenWidth,
  price,
  priceDecimal,
  login,
  title,
  discountPercent,
  addNewItemToBag,
}) => {
  const [modalShow, setModalShow] = useState(false);

  const addRequest = (e, item) => {
    e.preventDefault();
    setModalShow(true);
  };

  const handleAddToBag = (e) => {
    e.preventDefault();
    addNewItemToBag(
      {
        category,
        subCategory,
        productImageUrl,
        definition,
        screenWidth,
        price,
        priceDecimal,
        title,
        discountPercent,
      },
      1
    );
    setModalShow(false);
  };

  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        show={modalShow}
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
          <img src={productImageUrl} alt="Product" className="img-fluid" />
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={(e) => {
              handleAddToBag(e);
            }}
          >
            Add To Bag
          </Button>
        </Modal.Footer>
      </Modal>
      <div
        className={`container-fluid ${
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
        <button
          className="btn btn-success"
          onClick={(e) => {
            addRequest(e);
          }}
        >
          add to bag
        </button>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const { screenWidth, login } = state.site;
  return { screenWidth, login };
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
