import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";
import Card from "./Card";
import Cart from "../Cart/Cart";

const Backdrop = () => {
  return <div className={classes.backdrop}></div>;
};

const ModalOverlay = ({ children }) => {
  return <Card className={classes.modal}>{children}</Card>;
};

const Modal = ({ children }) => (
  <React.Fragment>
    {ReactDOM.createPortal(
      <Backdrop />,
      document.getElementById("backdrop-root")
    )}
    {ReactDOM.createPortal(
      <ModalOverlay>{children}</ModalOverlay>,
      document.getElementById("overlay-root")
    )}
  </React.Fragment>
);

export default Modal;
