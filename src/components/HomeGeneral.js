import React from "react";
import { Carousel } from "react-bootstrap";
import { FcNext, FcPrevious } from "react-icons/fc";
import food from "../assets/food.jpg";
import technology from "../assets/technology.png";
import wearing from "../assets/wearing.jpg";
import { IconContext } from "react-icons";

const HomeGeneral = () => {
  return (
    <>
      <div className="d-flex justify-content-center">
        <div
          className="container-fluid m-0 p-0"
          style={{ maxWidth: "500px", width: "90vw" }}
        >
          <Carousel
            fade
            nextLabel=""
            nextIcon={
              <span>
                <IconContext.Provider
                  value={{
                    className: "global-class-name border-dark bg-dark",
                    size: "2em",
                  }}
                >
                  <FcNext />
                </IconContext.Provider>
              </span>
            }
            prevLabel=""
            prevIcon={
              <span>
                <IconContext.Provider
                  value={{
                    className: "global-class-name border-dark bg-dark",
                    size: "2em",
                  }}
                >
                  <FcPrevious />
                </IconContext.Provider>
              </span>
            }
          >
            <Carousel.Item>
              <img
                className="d-block w-100 img-fluid"
                src={food}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>-</h3>
                <p></p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={wearing} alt="Second slide" />

              <Carousel.Caption>
                <h3>-</h3>
                <p></p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={technology}
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3>-</h3>
                <p></p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default HomeGeneral;
