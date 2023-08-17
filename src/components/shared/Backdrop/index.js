import React from "react";
import ReactDOM from "react-dom";
import "./style.css";

const Backdrop = () => {
  return ReactDOM.createPortal(
    <div className="backdrop"></div>,
    document.getElementById("backdrop-root")
  );
};

export default Backdrop;
