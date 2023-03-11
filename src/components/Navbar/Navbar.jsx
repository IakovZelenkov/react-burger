import React from "react";
import NavbarItem from "../NavbarItem/NavbarItem";
import {
  ProfileIcon,
  ListIcon,
  BurgerIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.wrapper}>
        <NavbarItem title="Конструктор" Logo={BurgerIcon} active={true} />
        <NavbarItem title="Лента заказов" Logo={ListIcon} />
      </ul>
      <NavbarItem title="Личный кабинет" Logo={ProfileIcon} />
    </nav>
  );
};

export default Navbar;
