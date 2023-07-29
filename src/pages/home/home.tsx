import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";

import styles from "./home.module.scss";
import { useAppSelector } from "../../services/hooks/hooks";

const HomePage: React.FC = () => {
  const ingredientsError = useAppSelector(
    (state) => state.burgerIngredients.error
  );

  if (ingredientsError) {
    return <div className={styles.error}>{ingredientsError}</div>;
  }
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.container}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </DndProvider>
  );
};

export default HomePage;
