import React, { useState } from "react";
import PropTypes from "prop-types";

function Heading(props) {
  return (
    <h1 className={props.className} style={{ color: props.color }}>
      {props.content}
    </h1>
  );
}

Heading.propTypes = {
  content: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
};

export default Heading;
