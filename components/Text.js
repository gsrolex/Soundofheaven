import React from "react";
import PropTypes from "prop-types";

function Text(props) {
  return (
    <p className={props.className} style={{ color: props.color }}>
      {props.content}
    </p>
  );
}

Text.propTypes = {
  content: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
};

export default Text;
