import PropTypes from "prop-types";
import React from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef(({ input, label }, ref) => (
  <div className={classes.input}>
    <label htmlFor={input.id}>{label}</label>
    <input
      ref={ref}
      type={input.type}
      id={input.id}
      min={input.min}
      max={input.max}
      step={input.step}
      defaultValue={input.defaultValue}
    />
  </div>
));

Input.propTypes = {
  input: PropTypes.shape({
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    min: PropTypes.string.isRequired,
    max: PropTypes.string.isRequired,
    step: PropTypes.string.isRequired,
    defaultValue: PropTypes.string.isRequired,
  }).isRequired,
  label: PropTypes.string.isRequired,
};

export default Input;
