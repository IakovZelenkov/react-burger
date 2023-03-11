import React from "react";
import styles from "./NavbarItem.module.scss";

const NavbarItem = ({ title, Logo, active = false }) => {
  // const [active, setActive] = React.useState(0);
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

export default NavbarItem;
