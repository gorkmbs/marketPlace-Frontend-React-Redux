import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const axios = require("axios");

const OldBuyings = ({ urlServer, token }) => {
  const [dataOldPurchases, setDataOldPurchases] = useState([]);

  useEffect(() => {
    if (token !== "") {
      axios({
        method: "get",
        url: urlServer + "/market/old-purchases",
        headers: { Authorization: token },
      })
        .then((response) => {
          if (response.data.success === true) {
            setDataOldPurchases(response.data.purchases);
          } else {
            window.alert("an error occured, please try again later");
          }
        })
        .catch((err) => {
          console.log(err);
          window.alert("an error occured, please try again later");
        });
    }
  }, [token, urlServer]);

  return (
    <>
      <div
        className="container-fluid m-0 p-3"
        style={{ background: "rgba(255,0,0,0.2)" }}
      >
        <h1 className="text-center">My Old Purchases</h1>
        {dataOldPurchases.length === 0 ? (
          <>
            <p className="text-center">You haven't bought anything yet</p>
            <Link to="/" className="linkWithoutBlueLine">
              <p
                className="text-primary text-center shadow"
                style={{ fontSize: "35px" }}
              >
                Start Shopping
              </p>
            </Link>
          </>
        ) : (
          <></>
        )}

        {dataOldPurchases.map((item, index) => {
          let date = new Date(item.buyingDate);
          return (
            <div className="container-fluid m-0 p-3 bg-white" key={item._id}>
              <h4 className="text-danger">{index + 1}:</h4>
              <h6 className="text-primary">Products:</h6>
              <ol>
                {item.bagItems.map((product, index2) => {
                  return (
                    <li key={index2}>
                      {product.productId.title}, count: {product.count}{" "}
                      <Link to={`/product/${product.productId._id}`}>
                        details
                      </Link>
                    </li>
                  );
                })}
              </ol>
              <p className="text-end text-success" style={{ fontSize: "30px" }}>
                Total: $
                {item.bagItems
                  .reduce((total, item) => {
                    total +=
                      item.count *
                      (((Number(item.productId.price) * 100 +
                        Number(item.productId.priceDecimal)) *
                        ((100 - Number(item.productId.discountPercent)) /
                          100)) /
                        100);

                    return total;
                  }, 0)
                  .toFixed(2)}
              </p>
              <h6 className="text-warning">Buyed on:</h6>
              <p>{date.toString()}</p>
              <div
                style={{ background: "rgba(255,0,0,0.2)", height: "5vh" }}
              ></div>
            </div>
          );
        })}
        <div style={{ height: "15vh" }}></div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const { token, urlServer } = state.site;
  return { token, urlServer };
};

export default connect(mapStateToProps)(OldBuyings);
