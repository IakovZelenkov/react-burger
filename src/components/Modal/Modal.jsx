import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import styles from "./Modal.module.scss";
import ModalOverlay from "./ModalOverlay";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRootElement = document.querySelector("#modal");

const Modal = (props) => {
  const { open, onClose, children } = props;
  const [type, setType] = React.useState("primary");

  const element = React.useMemo(() => document.createElement("div"), []);

  const handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      onClose();
    }
  };

  React.useEffect(() => {
    if (open) {
      modalRootElement.appendChild(element);
      document.body.addEventListener("keydown", handleEscClose);
      return () => {
        modalRootElement.removeChild(element);
        document.body.removeEventListener("keydown", handleEscClose);
      };
    }
  });

  return (
    open &&
    ReactDOM.createPortal(
      <div className={styles.modal}>
        <div onClick={onClose}>
          <ModalOverlay />
        </div>

        <div className={styles.wrapper}>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            onMouseEnter={() => setType("secondary")}
            onMouseLeave={() => setType("primary")}
          >
            <CloseIcon type={type} />
          </button>
          {children}
        </div>
      </div>,
      element
    )
  );
};

Modal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
};

export default Modal;
