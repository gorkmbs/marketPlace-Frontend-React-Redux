import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Form } from "react-bootstrap";
import { VscLoading } from "react-icons/vsc";
import { productSchema } from "../arrayFiles/product";
// const productSchema = require("../models/product");
import { USER_SHOPNAME_CHANGED } from "../actions/actionsForSite";
const Joi = require("joi");
const axios = require("axios");

const AddProduct = ({
  screenWidth,
  login,
  urlServer,
  token,
  shopName,
  setShopName,
}) => {
  var [currentText, setCurrentText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [dataCategory, setDataCategory] = useState([]);
  const [dataSubCategory, setDataSubCategory] = useState([]);
  const [allSteps, setallSteps] = useState(productSchema);
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  // eslint-disable-next-line
  const [submit, setSubmit] = useState("Add New Product");

  const getAllCategories = () => {
    if (selectedCategory !== "Unselected...") {
      axios({
        method: "get",
        url: urlServer + "/market/categories",
        headers: { Authorization: token },
      })
        .then((response) => {
          if (response.data.success === true) {
            setDataCategory(response.data.category);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getAllSubCategories = (selectedCategory) => {
    axios({
      method: "post",
      url: urlServer + "/market/sub-categories",
      headers: { Authorization: token },
      data: { selectedCategory },
    })
      .then((response) => {
        if (response.data.success === true) {
          setDataSubCategory(response.data.subCategory);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const shopNameAdd = (e) => {
    e.preventDefault();
    const schema = Joi.object({
      shopName: Joi.string().trim().required().alphanum().min(5).max(30),
    });
    const validation = schema.validate({ shopName: currentText });
    if (validation.error) {
      setError(validation.error.details[0].message);
      setIsError(true);
    } else {
      // hello to backend work

      axios({
        method: "post",
        url: urlServer + "/users/shop-name",
        headers: { Authorization: token },
        data: validation.value,
      })
        .then((response) => {
          if (response.data.success) {
            setShopName(currentText);
            setCurrentText("");
          } else {
          }
          setError(response.data.msg);
          setIsError(!response.data.success);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (shopName === "") {
      setCurrentStep(0);
    } else if (currentStep > 0) {
    } else {
      setCurrentStep(1);
    }

    if (currentStep === 1) {
      getAllCategories(selectedCategory);
    }

    if (selectedCategory === "") {
    } else {
      if (currentStep === 2) {
        getAllSubCategories(selectedCategory);
      }
    }
    // eslint-disable-next-line
  }, [shopName, currentStep, selectedCategory]);

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
              {currentStep > 0 ? (
                <>
                  {allSteps.map((item, index) => {
                    return (
                      <>
                        {currentStep === item.id + 1 ? (
                          <>
                            <Steps
                              key={item.id}
                              {...item}
                              currentText={currentText}
                              setCurrentText={setCurrentText}
                              setallSteps={setallSteps}
                              allSteps={allSteps}
                              currentStep={currentStep}
                              setCurrentStep={setCurrentStep}
                              setSelectedCategory={setSelectedCategory}
                              dataCategory={dataCategory}
                              dataSubCategory={dataSubCategory}
                              error={error}
                              setError={setError}
                              isError={isError}
                              setIsError={setIsError}
                            />
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    );
                  })}
                </>
              ) : (
                <>
                  <div className="form-group m-2 p-2">
                    <label htmlFor="username">Shop Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      style={{ background: "rgba(230,255,230)" }}
                      placeholder="Give a name to your shop"
                      value={currentText}
                      onChange={(e) => setCurrentText(e.target.value)}
                    />
                    <p id="name" className="form-text m-0 p-2">
                      You need to determine your market's name first. This must
                      be unique
                    </p>
                    {isError ? <h4 style={{ color: "red" }}>{error}</h4> : ""}
                    <div style={{ height: "10vh" }}></div>
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-primary"
                        onClick={(e) => {
                          shopNameAdd(e);
                        }}
                      >
                        Check Availability
                      </button>
                    </div>
                  </div>
                </>
              )}

              <br />
              {currentStep > 11 ? (
                <>
                  {isError ? <h4 style={{ color: "red" }}>{error}</h4> : ""}
                  <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary">
                      {submit}
                      {submit !== "Loading..." ? (
                        ""
                      ) : (
                        <>{<VscLoading className="rotate360" />}</>
                      )}
                    </button>
                  </div>
                </>
              ) : (
                <></>
              )}

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

const Steps = ({
  currentText,
  setCurrentText,
  setallSteps,
  allSteps,
  setError,
  error,
  setIsError,
  isError,
  currentStep,
  setCurrentStep,
  id,
  setSelectedCategory,
  definition,
  message,
  status,
  question,
  dataCategory,
  dataSubCategory,
  success,
  errorMsg,
}) => {
  const handleNext = (e) => {
    e.preventDefault();
    let newState = allSteps;
    newState[id].status = currentText;
    setallSteps(newState);
    setCurrentStep(currentStep + 1);
    if (currentStep === 1) {
      setCurrentText("");
    } else {
      setCurrentText(allSteps[id < 10 ? id + 1 : id].status);
    }
  };
  const handlePrev = (e) => {
    e.preventDefault();
    setCurrentStep(currentStep - 1);
    setCurrentText(allSteps[id > 0 ? id - 1 : id].status);
  };

  useEffect(() => {
    let validation = validChecker(id, currentText);
    setIsError(validation[0]);
    setError(validation[1]);
    // eslint-disable-next-line
  }, [currentText, dataSubCategory, allSteps]);

  return (
    <>
      {currentStep === id + 1 ? (
        <>
          <div className="d-flex justify-content-end">Step: {id + 1} / 11 </div>
          <div className="form-group m-2 p-2">
            {id === 0 || id === 1 || id === 8 || id === 9 ? (
              <>
                <label>{question}</label>
                <Form.Control
                  as="select"
                  style={{
                    background: isError
                      ? "rgba(255,255,255,0.9)"
                      : "rgba(0,255,0,0.1)",
                  }}
                  autoFocus={true}
                  onChange={(e) => {
                    setCurrentText(e.target.value);
                    if (id === 0) {
                      setSelectedCategory(e.target.value);
                    }
                  }}
                >
                  <option>Unselected...</option>
                  {id === 0
                    ? dataCategory.map((item, index) => {
                        return (
                          <option
                            key={index}
                            selected={
                              status === item.category ? "selected" : ""
                            }
                          >
                            {item.category}
                          </option>
                        );
                      })
                    : ""}
                  {id === 1
                    ? dataSubCategory.map((item, index) => {
                        return (
                          <option
                            key={index}
                            selected={
                              status === item.subCategory ? "selected" : ""
                            }
                          >
                            {item.subCategory}
                          </option>
                        );
                      })
                    : ""}
                  {id === 8
                    ? [
                        "5",
                        "10",
                        "15",
                        "20",
                        "25",
                        "30",
                        "35",
                        "40",
                        "45",
                        "50",
                      ].map((item, index) => {
                        return (
                          <option
                            key={index}
                            selected={status === item ? "selected" : ""}
                          >
                            {item}
                          </option>
                        );
                      })
                    : ""}
                  {id === 9
                    ? ["available", "not available"].map((item, index) => {
                        return (
                          <option
                            key={index}
                            selected={status === item ? "selected" : ""}
                          >
                            {item}
                          </option>
                        );
                      })
                    : ""}
                </Form.Control>
              </>
            ) : (
              <>
                <label htmlFor="username">{question}</label>
                <input
                  autoFocus={true}
                  type="text"
                  className="form-control"
                  style={{
                    background: isError
                      ? "rgba(255,255,255,0.9)"
                      : "rgba(0,255,0,0.1)",
                  }}
                  id="username"
                  placeholder={message}
                  value={status}
                  onChange={(e) => {
                    setCurrentText(e.target.value);
                    let newState = allSteps;
                    newState[id].status = e.target.value;
                    setallSteps(newState);
                  }}
                />
              </>
            )}

            <small id="name" className="form-text text-muted hidden"></small>
            {isError ? (
              <>
                <p
                  className="m-0 p-2 text-danger"
                  style={{ position: "absolute" }}
                >
                  {error}
                </p>
              </>
            ) : (
              <>
                <p
                  className="m-0 p-2 text-success"
                  style={{ position: "absolute" }}
                >
                  Ready to go :)
                </p>
              </>
            )}
            <div style={{ height: "10vh" }}></div>
            <div className="d-flex justify-content-around">
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  handlePrev(e);
                }}
              >
                Previous
              </button>
              {isError ? (
                <>
                  <button
                    className="btn btn-success"
                    onClick={(e) => handleNext(e)}
                    disabled
                  >
                    Save & Next
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-success"
                    onClick={(e) => handleNext(e)}
                  >
                    Save & Next
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

const validChecker = (id, currentText) => {
  let schema;

  if (id === 0) {
    if (currentText === "Unselected..." || currentText === "") {
      return [true, "select category please"];
    } else {
      return [false, ""];
    }
  }
  if (id === 1) {
    if (currentText === "Unselected..." || currentText === "") {
      return [true, "select sub category please"];
    } else {
      return [false, ""];
    }
  }
  if (id === 2) {
    schema = Joi.object({
      currentText: Joi.string().trim().required().alphanum().min(5).max(30),
    });
    let testObj = { currentText };
    const validation = schema.validate(testObj);
    if (validation.error) {
      return [true, validation.error.details[0].message.substring(14, 300)];
    } else {
      return [false, ""];
    }
  }
  if (id === 3) {
    schema = Joi.object({
      currentText: Joi.string().trim().required().alphanum().min(5).max(30),
    });
    let testObj = { currentText };
    const validation = schema.validate(testObj);
    if (validation.error) {
      return [true, validation.error.details[0].message.substring(14, 300)];
    } else {
      return [false, ""];
    }
  }
  if (id === 4) {
    schema = Joi.object({
      currentText: Joi.string().trim().required().alphanum().min(5).max(30),
    });
    let testObj = { currentText };
    const validation = schema.validate(testObj);
    if (validation.error) {
      return [true, validation.error.details[0].message.substring(14, 300)];
    } else {
      return [false, ""];
    }
  }
  if (id === 5) {
    schema = Joi.object({
      currentText: Joi.string().trim().required().alphanum().min(5).max(30),
    });
    let testObj = { currentText };
    const validation = schema.validate(testObj);
    if (validation.error) {
      return [true, validation.error.details[0].message.substring(14, 300)];
    } else {
      return [false, ""];
    }
  }
  if (id === 6) {
    schema = Joi.object({
      currentText: Joi.string().trim().required().alphanum().min(5).max(30),
    });
    let testObj = { currentText };
    const validation = schema.validate(testObj);
    if (validation.error) {
      return [true, validation.error.details[0].message.substring(14, 300)];
    } else {
      return [false, ""];
    }
  }
  if (id === 7) {
    schema = Joi.object({
      currentText: Joi.string().trim().required().alphanum().min(5).max(30),
    });
    let testObj = { currentText };
    const validation = schema.validate(testObj);
    if (validation.error) {
      return [true, validation.error.details[0].message.substring(14, 300)];
    } else {
      return [false, ""];
    }
  }
  if (id === 8) {
    if (currentText === "Unselected..." || currentText === "") {
      return [true, "select discount please"];
    } else {
      return [false, ""];
    }
  }
  if (id === 9) {
    if (currentText === "Unselected..." || currentText === "") {
      return [true, "select warranty please"];
    } else {
      return [false, ""];
    }
  }
  if (id === 10) {
    schema = Joi.object({
      currentText: Joi.string().trim().required().alphanum().min(5).max(30),
    });
    let testObj = { currentText };
    const validation = schema.validate(testObj);
    if (validation.error) {
      return [true, validation.error.details[0].message.substring(14, 300)];
    } else {
      return [false, ""];
    }
  }
};

const mapStateToProps = (state) => {
  const { screenWidth, login, urlServer, shopName, token } = state.site;
  return { screenWidth, login, urlServer, shopName, token };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setShopName: (shopName) =>
      dispatch({ type: USER_SHOPNAME_CHANGED, payload: { shopName } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
