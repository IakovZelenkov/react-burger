import React from "react";
import {
  Logo,
  ProfileIcon,
  ListIcon,
  BurgerIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./AppHeader.module.scss";

import NavbarItem from "./components/NavbarItem/NavbarItem";

const AppHeader = () => {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <nav className={styles.nav}>
        <ul className={styles.wrapper}>
          <NavbarItem title="Конструктор" Logo={BurgerIcon} active={true} />
          <NavbarItem title="Лента заказов" Logo={ListIcon} />
        </ul>
        <NavbarItem title="Личный кабинет" Logo={ProfileIcon} />
      </nav>
      <div className={styles.logo}>
        <Logo />
      </div>
    </header>
  );
};

export default AppHeader;
