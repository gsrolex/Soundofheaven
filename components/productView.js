import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

function View({ subcategory }) {
  useEffect(() => {
    const imgs = document.querySelectorAll(".img-select a");
    const imgBtns = [...imgs];
    let imgId = 1;

    imgBtns.forEach((imgItem) => {
      imgItem.addEventListener("click", (event) => {
        event.preventDefault();
        imgId = imgItem.dataset.id;
        slideImage();
      });
    });

    function slideImage() {
      const displayWidth = document.querySelector(
        ".img-showcase img:first-child"
      ).clientWidth;

      document.querySelector(".img-showcase").style.transform = `translateX(${
        -(imgId - 1) * displayWidth
      }px)`;
    }

    window.addEventListener("resize", slideImage);
  }, []);

  return (
    <>
      {subcategory.map((product) => {
        return (
          <Row key={product.id} className="image_slide">
            <div className="card-wrapper">
              <div className="card bg-dark border-0">
                <div className="product-imgs">
                  <div className="img-display">
                    <Col>
                      <div className="img-showcase">
                        {product.images.length > 0
                          ? product.images.map((img) => {
                              return (
                                <img
                                  key={img.src}
                                  className="img_product_slide"
                                  src={img.src}
                                  alt="shoe image"
                                ></img>
                              );
                            })
                          : null}
                      </div>
                    </Col>
                  </div>
                  <Col className="" md={7} lg={5}>
                    <div className="img-select">
                      {product.images.map((img, index) => {
                        return (
                          <div key={img.src} className="img-item">
                            <a href="#" data-id={index + 1}>
                              <img src={img.src} alt="shoe image"></img>
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  </Col>
                </div>
              </div>
            </div>
          </Row>
        );
      })}
    </>
  );
}

View.propTypes = {
  content: PropTypes.string,
  color: PropTypes.string,
  Name: PropTypes.string,
};

export default View;
