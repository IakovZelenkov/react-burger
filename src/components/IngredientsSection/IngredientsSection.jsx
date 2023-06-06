import React from "react";
import PropTypes from "prop-types";
import ingredientType from "../../utils/types.js";
import styles from "./IngredientsSection.module.scss";
import IngredientElement from "../IngredientElement/IngredientElement";

const IngredientsSection = React.forwardRef(({ title, ingredients }, ref) => {
  const { titleRef, inViewRef } = ref;
  return (
    <div className={`${styles.section}`}>
      <h2 ref={titleRef} className="title text text_type_main-medium mb-6">
        {title}
      </h2>
      <ul ref={inViewRef} className={`${styles.list}`}>
        {ingredients.map((ingredient) => (
          <IngredientElement key={ingredient._id} ingredient={ingredient} />
        ))}
      </ul>
    </div>
  );
});

IngredientsSection.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
  title: PropTypes.string.isRequired,
};

export default IngredientsSection;
