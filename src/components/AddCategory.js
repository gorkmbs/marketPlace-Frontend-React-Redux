import React, { useState } from "react";
import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import { VscLoading } from "react-icons/vsc";

const axios = require("axios");

const AddCategory = ({ screenWidth, admin, urlServer, token }) => {
  const [categoryName, setCategoryName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [submit, setSubmit] = useState("Add New Category");
  const [selectedCategory, setSelectedCategory] = useState("Unselected...");
  // eslint-disable-next-line
  const [errorSub, setErrorSub] = useState("");
  // eslint-disable-next-line
  const [isErrorSub, setIsErrorSub] = useState(false);
  // eslint-disable-next-line
  const [submitSub, setSubmitSub] = useState("Add New Sub Category");
  const [dataCategory, setDataCategory] = useState([]);

  const getAllCategories = (e) => {
    e.preventDefault();
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
  };

  const addNewCategory = (e) => {
    setSubmit("submitting");
    e.preventDefault();
    axios({
      method: "post",
      url: urlServer + "/market/add-new-category",
      headers: { Authorization: token },
      data: { categoryName },
    })
      .then((response) => {
        if (response.data.success === true) {
          setSubmit("submitted");
          setIsError(false);
          getAllCategories(e);
        } else {
          setSubmit("error occured");
        }
      })
      .catch((err) => {
        setIsError(true);
        setSubmit("error occured");
        setError("something went wrong :(");
        console.log(err);
      });
  };

  return (
    <>
      {admin ? (
        <>
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
                  <span className="text-danger">New</span> Category !Admin!
                </h1>
                <div
                  style={{ height: "3px", background: "rgba(55,50,250,0.5)" }}
                ></div>
                <br />
                <form
                  onSubmit={(e) => {
                    addNewCategory(e);
                  }}
                >
                  <div className="form-group m-2 p-2">
                    <label htmlFor="username">Category Name</label>
                    <input
                      type="username"
                      className="form-control"
                      id="username"
                      placeholder="What is the category name?"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                    />
                    <small
                      id="name"
                      className="form-text text-muted hidden"
                    ></small>
                  </div>
                  {isError ? <h4 style={{ color: "red" }}>{error}</h4> : ""}
                  <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary">
                      {submit}
                      {submit === "Add New Category" ? (
                        ""
                      ) : (
                        <>{<VscLoading className="rotate360" />}</>
                      )}
                    </button>
                  </div>
                  <br />
                  <br />
                </form>
                <form onSubmit={() => {}}>
                  <div className="form-group m-2 p-2">
                    <div className="container-fluid m-0 mb-4 p-0">
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>
                          Category Select{" "}
                          <button
                            className="btn btn-warning"
                            onClick={(e) => getAllCategories(e)}
                          >
                            {" "}
                            Refresh
                          </button>
                        </Form.Label>
                        <Form.Control
                          as="select"
                          onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                          <option>Unselected...</option>
                          {dataCategory.map((item, index) => {
                            return <option key={index}>{item.category}</option>;
                          })}
                        </Form.Control>
                      </Form.Group>
                    </div>
                    <label htmlFor="username">Sub Category Name</label>
                    <input
                      type="username"
                      className="form-control"
                      id="username"
                      placeholder={
                        selectedCategory !== "Unselected..."
                          ? "What is the sub category name?"
                          : "select category"
                      }
                      value={subCategoryName}
                      onChange={(e) => {
                        if (selectedCategory !== "Unselected...") {
                          setSubCategoryName(e.target.value);
                        }
                      }}
                    />
                    <small
                      id="name"
                      className="form-text text-muted hidden"
                    ></small>
                  </div>
                  {isErrorSub ? (
                    <h4 style={{ color: "red" }}>{errorSub}</h4>
                  ) : (
                    ""
                  )}
                  <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary">
                      {submitSub}
                      {submitSub === "Add New Sub Category" ? (
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
      ) : (
        <></>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { screenWidth, admin, urlServer, token } = state.site;
  return { screenWidth, admin, urlServer, token };
};

export default connect(mapStateToProps)(AddCategory);
