import React from "react";
import PropTypes from "prop-types";
import styles from "./NavbarItem.module.scss";

const NavbarItem = ({ title, Logo, active = false }) => {
  return (
    <li className={styles.item}>
      <a
        href="/"
        className={`${styles.item} pt-4 pb-4 pl-5 pr-5 ${
          active === true ? styles.active : ""
        }`}
      >
        <Logo />
        <span className="text text_type_main-default">{title}</span>
      </a>
    </li>
  );
};

NavbarItem.propTypes = {
  Logo: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

export default NavbarItem;
