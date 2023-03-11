import React from "react";
import styles from "./Main.module.scss";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import data from "../../utils/data.js";
import testOrder from "../../utils/testOrder.js";

const Main = () => {
  return (
    <div className={styles.container}>
      <BurgerIngredients items={data} />
      <BurgerConstructor order={testOrder} />
    </div>
  );
};

export default Main;
