import React from "react";
import styles from "./App.module.scss";

import AppHeader from "../AppHeader/AppHeader";

import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

import testOrder from "../../utils/testOrder.js";

function App() {
  const [items, setItems] = React.useState([]);
  const [error, setError] = React.useState(false);
  const ingredientsURL = "https://norma.nomoreparties.space/api/ingredients";

  React.useEffect(() => {
    fetch(ingredientsURL)
      .then((res) => (res.ok ? res.json() : setError(true)))
      .then((data) => {
        setItems(data.data);
      })
      .catch((err) => {
        setError(true);
        console.error(err);
      });
  }, []);

  return (
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
          <BurgerConstructor data={testOrder} />
        </div>
      )}
    </div>
  );
}

export default App;
