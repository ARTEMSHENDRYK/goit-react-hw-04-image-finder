import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import css from "./Modal.module.css";

const modalRootRef = document.querySelector("#modal-root");

function Modal({ onClose, children }) {
  
  useEffect(() => {
    window.addEventListener("keydown", handleKeyESCDown);
    
    return () => {
      window.removeEventListener("keydown", handleKeyESCDown);
    };
  })
  
  function handleClickBackdrop(evt) {   
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  }

  function handleKeyESCDown(evt)  {
    if (evt.code === "Escape") {
      onClose();
    }
  }

  return (
    createPortal(
      <div className={css.Overlay} onClick={handleClickBackdrop}>
        <div className={css.Modal}>
          {children}
        </div>
      </div>
    , modalRootRef)
  )
}

Modal.propTypes = {
  children: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Modal;