import React from "react";
import styles from "./profile.module.scss";

import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../../services/actions/authActions";

import { Outlet } from "react-router-dom";

const ProfilePage = () => {
  const dispatch = useDispatch();
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <ul className={styles.navItems}>
          <li className={styles.navItem}>
            <NavLink
              to="/profile"
              end
              className={(isActive) =>
                `${styles.link} text_type_main-medium text_color_inactive text ` +
                (isActive.isActive ? `${styles.active}` : "")
              }
            >
              Профиль
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="/profile/orders"
              className={(isActive) =>
                `${styles.link} text_type_main-medium text_color_inactive text ` +
                (isActive.isActive ? `${styles.active}` : "")
              }
            >
              История заказов
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              onClick={() => {
                dispatch(logoutUser());
              }}
              to="/"
              className={`${styles.link} text_type_main-medium text_color_inactive text `}
            >
              Выход
            </NavLink>
          </li>
        </ul>
        <p
          className={`${styles.description} text_type_main-default text_color_inactive text`}
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <Outlet />
    </div>
  );
};

export default ProfilePage;
