import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
// import { FcNext, FcPrevious } from "react-icons/fc";

// import { IconContext } from "react-icons";

import { homeScreenItems } from "../arrayFiles/homeScreenItems";

const HomeGeneral = () => {
  const [indexForSlide, setIndexForSlide] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndexForSlide(selectedIndex);
  };

  return (
    <>
      <div className="container-fluid m-0 p-0">
        <div
          className="d-flex justify-content-center"
          style={{ background: "rgba(0,250,0,0.1)" }}
        >
          <div
            className="container-fluid m-0 p-0 homeSlideItems border border-secondary"
            style={{
              borderRadius: "10px",
              maxWidth: "500px",
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
              indicators={true}
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
              {homeScreenItems.map((item) => {
                return (
                  <Carousel.Item key={item.id}>
                    <img
                      onClick={() => {
                        // window.location.reload();
                      }}
                      ket={item.id}
                      className="d-block w-100"
                      src={item.img}
                      alt={`${item.id} slide`}
                    />
                  </Carousel.Item>
                );
              })}
            </Carousel>
            <div className="d-flex justify-content-center m-1 p-1">
              {homeScreenItems.map((item) => {
                return (
                  <button
                    onClick={() => setIndexForSlide(item.id - 1)}
                    key={item.id}
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
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeGeneral;
