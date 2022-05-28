import PropTypes from "prop-types";

export default function ErrorPost({ children }) {
  return <div className="form-error">{children}</div>;
}

ErrorPost.proptTypes = {
  children: PropTypes.node.isRequired,
};
