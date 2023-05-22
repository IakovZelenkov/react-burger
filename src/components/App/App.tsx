import React from "react";
import styles from "./App.module.scss";

import AppHeader from "../AppHeader/AppHeader";

import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

import { getIngredients } from "../../utils/burger-api";

import { BurgerIngredientsContext } from "../../services/appContext";

function App() {
  const [items, setItems] = React.useState([]);
  const [error, setError] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    getIngredients()
      .then((data) => {
        setItems(data.data);
        setIsLoaded(true);
      })
      .catch((err) => {
        setError(true);
        console.error(err);
      });
  }, []);

  return isLoaded ? (
    <div className={styles.app}>
      <AppHeader />
      {error ? (
        <div className={styles.error}>
          <p className="text text_type_main-large mt-10">
            Что-то пошло не так :(
          </p>
        </div>
      ) : (
        <div className={styles.container}>
          <BurgerIngredientsContext.Provider value={{ items, setItems }}>
            <BurgerIngredients items={items} />
            <BurgerConstructor />
          </BurgerIngredientsContext.Provider>
        </div>
      )}
    </div>
  ) : (
    <></>
  );
}

export default App;
