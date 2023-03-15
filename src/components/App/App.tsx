import React from "react";
import styles from "./App.module.scss";

import AppHeader from "../AppHeader/AppHeader";

import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

import getIngredients from "../../utils/burger-api";

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
          <BurgerIngredients items={items} />
          <BurgerConstructor data={items} />
        </div>
      )}
    </div>
  ) : (
    <></>
  );
}

export default App;
