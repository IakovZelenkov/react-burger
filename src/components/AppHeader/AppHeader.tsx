import React from "react";
import {
  Logo,
  ProfileIcon,
  ListIcon,
  BurgerIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./AppHeader.module.scss";
import { NavLink, Link } from "react-router-dom";

const AppHeader: React.FC = () => {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <nav className={styles.nav}>
        <ul className={styles.wrapper}>
          <li className={styles.item}>
            <NavLink
              to="/"
              className={(isActive) =>
                `${styles.item} pt-4 pb-4 pl-5 pr-5 ` +
                (isActive.isActive ? `${styles.active}` : "")
              }
            >
              <BurgerIcon type="primary" />
              <span className="text text_type_main-default">Конструктор</span>
            </NavLink>
          </li>
          <li className={styles.item}>
            <NavLink
              to="/feed"
              className={(isActive) =>
                `${styles.item} pt-4 pb-4 pl-5 pr-5 ` +
                (isActive.isActive ? `${styles.active}` : "")
              }
            >
              <ListIcon type="primary" />
              <span className="text text_type_main-default">
                Лента заказов
              </span>
            </NavLink>
          </li>
        </ul>
        <NavLink
          to="/profile"
          className={(isActive) =>
            `${styles.item} pt-4 pb-4 pl-5 pr-5 ` +
            (isActive.isActive ? `${styles.active}` : "")
          }
        >
          <ProfileIcon type="primary" />
          <span className="text text_type_main-default">Личный кабинет</span>
        </NavLink>
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
