import React from "react";
import styles from "./Modal.module.scss";
import PropTypes from "prop-types";

const ModalOverlay = ({ onClose }) => {
  return <div className={styles.overlay} onClick={onClose}></div>;
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
