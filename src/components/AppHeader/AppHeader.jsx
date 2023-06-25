import React from "react";
import {
  Logo,
  ProfileIcon,
  ListIcon,
  BurgerIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./AppHeader.module.scss";
import { Link } from "react-router-dom";
import NavbarItem from "./components/NavbarItem";

const AppHeader = () => {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <nav className={styles.nav}>
        <ul className={styles.wrapper}>
          <NavbarItem title="Конструктор" Logo={BurgerIcon} to="/" />
          <NavbarItem title="Лента заказов" Logo={ListIcon} to="/feed" />
        </ul>
        <NavbarItem title="Личный кабинет" Logo={ProfileIcon} to="/profile" />
      </nav>
      <div className={styles.logo}>
        <Link to="/">
          <Logo />
        </Link>
      </div>
    </header>
  );
};

export default AppHeader;
