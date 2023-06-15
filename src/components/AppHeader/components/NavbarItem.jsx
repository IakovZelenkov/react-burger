import React from "react";
import PropTypes from "prop-types";
import styles from "./NavbarItem.module.scss";
import { NavLink } from "react-router-dom";

const NavbarItem = ({ title, Logo, to }) => {
  return (
    <li className={styles.item}>
      <NavLink
        to={to}
        className={(isActive) =>
          `${styles.item} pt-4 pb-4 pl-5 pr-5 ` +
          (isActive.isActive ? `${styles.active}` : "")
        }
      >
        <Logo />
        <span className="text text_type_main-default">{title}</span>
      </NavLink>
    </li>
  );
};

NavbarItem.propTypes = {
  Logo: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default NavbarItem;
