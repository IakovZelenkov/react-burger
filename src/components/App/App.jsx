import React from "react";
import styles from "./App.module.scss";

import AppHeader from "../AppHeader/AppHeader";

import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { useDispatch } from "react-redux";
import { getIngredient } from "../../services/slices/burgerIngredientsSlice";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getIngredient());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />

      <div className={styles.container}>
        <BurgerIngredients />
        {/* <BurgerConstructor /> */}
      </div>
    </div>
  );
}

export default App;
