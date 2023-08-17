import React from 'react';
import ReactDOM from 'react-dom';
import Backdrop from '../Backdrop';
import Button from '../Button';
import './style.css';

const Modal = props => {
  const { onClose, heading, onSubmit, className } = props;
  const modalClassName = `modal ${className}`;
  const modal = (
    <>
      <Backdrop />

      <div className={modalClassName}>
        <header className="modal-header">
          <h1>{heading}</h1>
          <Button className="btn btn-small" onClick={onClose}>
            X
          </Button>
        </header>
        {props.children}
        <footer className="modal-footer">
          <Button onClick={onClose}>Close</Button>
          <Button onClick={onSubmit}>Submit</Button>
        </footer>
      </div>
    </>
  );
  return ReactDOM.createPortal(modal, document.getElementById('modal-root'));
};

export default Modal;
