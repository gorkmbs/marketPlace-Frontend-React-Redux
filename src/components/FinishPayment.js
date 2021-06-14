import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";
import { MdCloudDone } from "react-icons/md";
import { IconContext } from "react-icons";
import { BsInfoCircle } from "react-icons/bs";
import { Modal } from "react-bootstrap";
import { CLEAR_BAG } from "../actions/actionsForBag";
import useSound from "use-sound";

import paymentDone from "../soundEffects/paymentDone.mp3";
const axios = require("axios");

const FinishPayment = ({
  bagItems,
  screenWidth,
  urlServer,
  token,
  clearBag,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [processingText, setProcessingText] = useState("Connecting to Bank");
  const [successPayment, setSuccessPayment] = useState(false);
  const [playPaymentDone] = useSound(paymentDone);

  useEffect(() => {
    if (modalShow === true) {
      setTimeout(() => {
        setProcessingText(processingText + ".");
      }, 1000);
      setTimeout(() => {
        setProcessingText(processingText + "..");
      }, 2000);
      setTimeout(() => {
        setProcessingText(processingText + "...");
      }, 3000);
      setTimeout(() => {
        setProcessingText("Taking Payment");
      }, 4000);
      setTimeout(() => {
        axios({
          method: "get",
          url: urlServer + "/market/finish-shopping",
          headers: { Authorization: token },
        })
          .then((response) => {
            if (response.data.success === true) {
              playPaymentDone();
              setProcessingText(response.data.msg);
              setSuccessPayment(true);

              setTimeout(() => {
                clearBag();
                setModalShow(false);
              }, 3000);
            } else {
              setProcessingText(response.data.msg);

              setTimeout(() => {
                setModalShow(false);
              }, 3000);
            }
          })
          .catch((err) => {
            setProcessingText("An Error Occured");

            setTimeout(() => {
              setModalShow(false);
            }, 3000);
          });
      }, 4800);
    }
    // eslint-disable-next-line
  }, [modalShow]);

  return (
    <>
      {bagItems.length === 0 ? (
        <>
          <Redirect to="/" />
        </>
      ) : (
        <></>
      )}
      <div
        className="d-flex justify-content-center"
        style={{ background: "rgba(0,255,0,0.2)" }}
      >
        <div
          className="m-4 p-4"
          style={{ background: "rgba(255,255,255,0.8)" }}
        >
          <h1>Payment and Finishing</h1>
          <h6>Products</h6>
          {bagItems.length === 0 ? (
            <>
              <h1 className="text-danger">No item in the bag</h1>
            </>
          ) : (
            <></>
          )}
          <ol>
            {bagItems.map((item, index) => {
              return (
                <li key={index}>
                  {item.item.title}, count: {item.count}
                </li>
              );
            })}
          </ol>
          <h2 className="text-end">
            Total: $
            {bagItems
              .reduce((total, item) => {
                total +=
                  item.count *
                  (((Number(item.item.price) * 100 +
                    Number(item.item.priceDecimal)) *
                    ((100 - Number(item.item.discountPercent)) / 100)) /
                    100);

                return total;
              }, 0)
              .toFixed(2)}
          </h2>
          <div className="d-flex justify-content-end">
            {bagItems.length > 0 ? (
              <>
                <button
                  className="btn btn-success"
                  onClick={(e) => {
                    e.preventDefault();
                    setModalShow(true);
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
                  Buy Items
                </button>
              </>
            ) : (
              <>
                <button className="btn btn-success" disabled>
                  <IconContext.Provider
                    value={{
                      color: "rgb(53,244,244)",
                      className: "global-class-name",
                      size: "20px",
                    }}
                  >
                    <GiShoppingCart />
                  </IconContext.Provider>{" "}
                  Buy Items
                </button>
              </>
            )}
          </div>
          <div style={{ height: "10vh" }}></div>
          <div className="d-flex">
            <div className="m-1 p-0">
              <BsInfoCircle style={{ fontSize: "50px", color: "red" }} />
            </div>
            <p className="text-dark">
              Because this site is not a real e-commerce site, we don't take
              your adress and credit-card number. Please do not share this
              information with anyone else in this site.
            </p>
          </div>
        </div>
      </div>
      <Modal
        size="lg"
        backdrop="static"
        aria-labelledby="contained-modal-title-vcenter"
        show={modalShow}
        style={{ background: "rgba(0,255,50,0.3)", zIndex: "5000" }}
        onHide={() => {
          setModalShow(false);
        }}
        centered
      >
        <Modal.Body>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "50vh" }}
          >
            <div className="m-0 p-0">
              <div className="d-flex justify-content-center">
                {successPayment ? (
                  <>
                    <MdCloudDone
                      style={{ fontSize: "150px", color: "green" }}
                    />
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div>
                <h1>{processingText}</h1>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  const { screenWidth, urlServer, token } = state.site;
  const { bagItems } = state.bag;
  return { screenWidth, bagItems, urlServer, token };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearBag: () => {
      dispatch({ type: CLEAR_BAG });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FinishPayment);
