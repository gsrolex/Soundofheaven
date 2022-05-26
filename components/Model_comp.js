import React, { useState } from "react";
import PropTypes from "prop-types";
import { Col } from "react-bootstrap";

import Image_comp from "./img/Image_comp";

function Model_comp(props) {
  return (
    <Col className="text_container p-5" md={12} lg={4}>
      <Image_comp
        className={props.className_one}
        layout={props.layout_one}
        src={props.src_one}
        alt={props.alt_one}
      />
      <Image_comp
        className={props.className_two}
        layout={props.layout_two}
        src={props.src_two}
        alt={props.alt_two}
      />
    </Col>
  );
}

Model_comp.propTypes = {
  className: PropTypes.string,
  layout: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
};

export default Model_comp;
