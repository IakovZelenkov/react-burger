import React from "react";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./AppHeader.module.scss";
import Navbar from "../Navbar/Navbar";

const AppHeader = () => {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <Navbar />
      <div className={styles.logo}>
        <Logo />
      </div>
    </header>
  );
};

export default AppHeader;
