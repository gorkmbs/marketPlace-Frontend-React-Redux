import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { VscLoading } from "react-icons/vsc";
import { productSchema } from "../models/product";
// const productSchema = require("../models/product");

const AddProduct = ({ screenWidth, login }) => {
  const [productName, setProductName] = useState("");
  // eslint-disable-next-line
  const [currentStep, setCurrentStep] = useState(0);
  // eslint-disable-next-line
  const [allSteps, setallSteps] = useState(productSchema);
  // eslint-disable-next-line
  const [error, setError] = useState("");
  // eslint-disable-next-line
  const [isError, setIsError] = useState(false);
  // eslint-disable-next-line
  const [submit, setSubmit] = useState("Add New Product");

  return (
    <>
      {login ? <></> : <Redirect to="/" />}
      <div className="container-fluid m-0 p-0 addProductBackground">
        <div style={{ height: "5vh" }}></div>
        <div
          className="d-flex m-0 p-0 justify-content-center "
          style={{
            width: screenWidth <= 768 ? screenWidth : screenWidth - 100,
            minHeight: "100vh",
          }}
        >
          <div
            className="container-fluid m-0 p-0"
            style={{
              width: "85vw",
              maxWidth: "760px",
              background: "rgba(255,255,255,0.7)",
              boxShadow: "10px 10px 15px rgba(0,0,0,0.5)",
            }}
          >
            <h1 className="text-center m-1 p-1">
              <span className="text-danger">New</span> Product
            </h1>
            <div
              style={{ height: "3px", background: "rgba(55,50,250,0.5)" }}
            ></div>
            <br />
            <form onSubmit={() => {}}>
              {currentStep === 0 ? (
                <>
                  <div className="form-group m-2 p-2">
                    <label htmlFor="username">Product Name</label>
                    <input
                      type="username"
                      className="form-control"
                      id="username"
                      placeholder="What is the product's name?"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                    />
                    <small
                      id="name"
                      className="form-text text-muted hidden"
                    ></small>
                    <div style={{ height: "10vh" }}></div>
                    <div className="d-flex justify-content-between">
                      <button className="btn btn-warning">Previous</button>
                      <button className="btn btn-success">Next</button>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}

              <br />

              {isError ? <h4 style={{ color: "red" }}>{error}</h4> : ""}
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary">
                  {submit}
                  {submit === "Login" ? (
                    ""
                  ) : (
                    <>{<VscLoading className="rotate360" />}</>
                  )}
                </button>
              </div>
              <br />
              <br />
            </form>
          </div>
        </div>
        <div style={{ height: "5vh" }}></div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const { screenWidth, login } = state.site;
  return { screenWidth, login };
};

export default connect(mapStateToProps)(AddProduct);
