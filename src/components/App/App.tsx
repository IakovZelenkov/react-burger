import React from "react";
import styles from "./App.module.scss";

import AppHeader from "../AppHeader/AppHeader";

import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import data from "../../utils/data.js";
import testOrder from "../../utils/testOrder.js";

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <div className={styles.container}>
        <BurgerIngredients items={data} />
        <BurgerConstructor data={testOrder} />
      </div>
    </div>
  );
}

export default App;
