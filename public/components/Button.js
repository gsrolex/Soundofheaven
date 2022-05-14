import React, { useState } from "react";
import PropTypes from "prop-types";

function Buttons(props) {
  return (
    <button
      type="button"
      className={props.className}
      style={{ color: props.color }}
    >
      {props.content}
    </button>
  );
}

Buttons.propTypes = {
  content: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
};

export default Buttons;
