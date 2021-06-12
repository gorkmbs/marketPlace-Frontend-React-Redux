import React from "react";
import { connect } from "react-redux";
import { GiShoppingCart } from "react-icons/gi";
import { IconContext } from "react-icons";
import { BsInfoCircle } from "react-icons/bs";

const FinishPayment = ({ bagItems, screenWidth }) => {
  return (
    <>
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
          <ol>
            {bagItems.map((item) => {
              return (
                <li>
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
            <button className="btn btn-success">
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
          </div>
          <div style={{ height: "10vh" }}></div>
          <div className="d-flex">
            <div className="m-1 p-0">
              <BsInfoCircle style={{ fontSize: "50px", color: "red" }} />
            </div>
            <p className="text-dark">
              Because of being this site is not a real e-commerce site, we don't
              take your adress and credit-card number. Please do not share these
              information with anyone in this site.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const { screenWidth } = state.site;
  const { bagItems } = state.bag;
  return { screenWidth, bagItems };
};

export default connect(mapStateToProps)(FinishPayment);
