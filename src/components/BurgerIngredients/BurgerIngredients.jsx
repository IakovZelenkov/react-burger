import React from "react";
import styles from "./BurgerIngredients.module.scss";

import Categories from "../Categories/Categories";
import IngredientsSection from "../IngredientsSection/IngredientsSection";

const BurgerIngredients = ({ items }) => {
  const ingredientTitles = {
    bun: "Булки",
    main: "Начинки",
    sauce: "Соусы",
  };

  const ingredientsSorted = items.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {});

  return (
    <div className={styles.container}>
      <h1 className="title text text_type_main-large mb-5 pt-10">
        Соберите бургер
      </h1>
      <Categories items={Object.values(ingredientTitles)} />
      <div className={`${styles.wrapper} scroller`}>
        {Object.keys(ingredientsSorted).map((ingredient) => (
          <IngredientsSection
            key={ingredient}
            title={ingredientTitles[ingredient]}
            ingredients={ingredientsSorted[ingredient]}
          />
        ))}
      </div>
    </div>
  );
};

export default BurgerIngredients;
