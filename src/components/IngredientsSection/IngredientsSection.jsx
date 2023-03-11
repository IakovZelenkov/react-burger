import React from "react";
import styles from "./IngredientsSection.module.scss";
import IngredientElement from "../IngredientElement/IngredientElement";

const IngredientsSection = ({ title, ingredients }) => {
  return (
    <div className={`${styles.section}`}>
      <h2 className="title text text_type_main-medium mb-6">{title}</h2>
      <ul className={`${styles.list}`}>
        {ingredients.map((ingredient) => (
          <IngredientElement key={ingredient._id} {...ingredient} />
        ))}
      </ul>
    </div>
  );
};

export default IngredientsSection;
