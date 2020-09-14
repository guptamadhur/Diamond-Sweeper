import React from "react";
import PropTypes from "prop-types";
import "./index.css";

const Modal = ({ heading, body, buttonClick }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2>{heading}</h2>
      <h4> {body} </h4>
      <button className="btn" onClick={buttonClick.onClick}>
        {buttonClick.text}
      </button>
    </div>
  </div>
);

Modal.propTypes = {
  heading: PropTypes.string,
  body: PropTypes.string,
  buttonClick: PropTypes.object,
};

export default Modal;
