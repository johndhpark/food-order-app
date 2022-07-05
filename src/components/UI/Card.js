import PropTypes from "prop-types";
import classes from "./Card.module.css";

const Card = ({ className, children }) => (
  <div className={`${classes.card} ${className}`}>{children}</div>
);

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
};

Card.defaultProps = {
  className: "",
};

export default Card;
