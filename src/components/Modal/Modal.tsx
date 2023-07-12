import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import styles from "./Modal.module.scss";
import ModalOverlay from "./ModalOverlay";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = (props) => {
  const { onClose, children } = props;

  const handleEscClose = (evt: KeyboardEvent) => {
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
    document.getElementById("modal")!
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Modal;
