import React, { useEffect } from "react";
import styles from "./profile.module.scss";

import { useDispatch } from "react-redux";
import { NavLink, useMatch } from "react-router-dom";
import { logoutUser, checkUserAuth } from "../../services/slices/auth/actions";

import { Outlet } from "react-router-dom";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const match = useMatch({
    path: "/profile/orders",
    end: true,
  });

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <ul className={styles.navItems}>
          <li className={styles.navItem}>
            <NavLink
              to=""
              end
              className={({ isActive }) =>
                `${styles.link} text_type_main-medium text_color_inactive text ` +
                (isActive ? ` ${styles.active}` : "")
              }
            >
              Профиль
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="orders"
              end
              className={({ isActive }) =>
                `${styles.link} text_type_main-medium text_color_inactive text ` +
                (isActive ? ` ${styles.active}` : "")
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
              to="/login"
              className={`${styles.link} text_type_main-medium text_color_inactive text `}
            >
              Выход
            </NavLink>
          </li>
        </ul>
        <p
          className={`${styles.description} text_type_main-default text_color_inactive text`}
        >
          {match
            ? "В этом разделе вы можете просмотреть свою историю заказов"
            : "В этом разделе вы можете изменить свои персональные данные"}
        </p>
      </nav>
      <Outlet />
    </div>
  );
};

export default ProfilePage;
