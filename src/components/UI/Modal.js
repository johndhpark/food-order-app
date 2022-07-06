import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import Card from "./Card";
import classes from "./Modal.module.css";

const Backdrop = ({ onClick }) => (
  <div
    role="button"
    aria-label="Close Modal"
    className={classes.backdrop}
    onClick={onClick}
    onKeyPress={onClick}
    tabIndex={0}
  />
);

const ModalOverlay = ({ children }) => (
  <Card className={classes.modal}>{children}</Card>
);

const Modal = ({ onBackdropClick, children }) => (
  <>
    {ReactDOM.createPortal(
      <Backdrop onClick={onBackdropClick} />,
      document.getElementById("backdrop-root")
    )}
    {ReactDOM.createPortal(
      <ModalOverlay>{children}</ModalOverlay>,
      document.getElementById("overlay-root")
    )}
  </>
);

Backdrop.propTypes = {
  onClick: PropTypes.func.isRequired,
};

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
};

Modal.propTypes = {
  onBackdropClick: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default Modal;
