import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import styles from "./Modal.module.scss";
import ModalOverlay from "./ModalOverlay";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modal = document.getElementById("modal");

const Modal = (props) => {
  const { onClose, children } = props;

  const handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      onClose();
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  });

  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <ModalOverlay onClose={onClose} />
      <div className={styles.wrapper}>
        <button type="button" className={styles.closeButton} onClick={onClose}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </div>,
    modal
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Modal;
