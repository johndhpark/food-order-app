import React from "react";
import ReactDOM from "react-dom";
import Card from "./Card";
import classes from "./Modal.module.css";

const Backdrop = ({ onClick }) => {
  return <div className={classes.backdrop} onClick={onClick}></div>;
};

const ModalOverlay = ({ children }) => {
  return <Card className={classes.modal}>{children}</Card>;
};

const Modal = ({ onBackdropClick, children }) => (
  <React.Fragment>
    {ReactDOM.createPortal(
      <Backdrop onClick={onBackdropClick} />,
      document.getElementById("backdrop-root")
    )}
    {ReactDOM.createPortal(
      <ModalOverlay>{children}</ModalOverlay>,
      document.getElementById("overlay-root")
    )}
  </React.Fragment>
);

export default Modal;
