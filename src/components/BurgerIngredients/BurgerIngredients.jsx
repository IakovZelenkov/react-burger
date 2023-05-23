import React from "react";
import PropTypes from "prop-types";
import ingredientType from "../../utils/types.js";
import styles from "./BurgerIngredients.module.scss";

import Tabs from "../Tabs/Tabs";
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
      <Tabs items={Object.values(ingredientTitles)} />
      <div className={`${styles.wrapper} scroller`}>
        {Object.keys(ingredientsSorted).map((key) => (
          <IngredientsSection
            key={key}
            title={ingredientTitles[key]}
            ingredients={ingredientsSorted[key]}
          />
        ))}
      </div>
    </div>
  );
};

BurgerIngredients.propTypes = {
  items: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
};

export default BurgerIngredients;
