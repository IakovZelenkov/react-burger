import React, { forwardRef, Ref } from "react";
import styles from "./IngredientsSection.module.scss";
import IngredientElement from "../IngredientElement/IngredientElement";
import { IIngredient } from "../../services/types/types";

interface IIngredientsSectionProps {
  title: string;
  ingredients: IIngredient[];
  inViewRef: Ref<HTMLUListElement>;
}

const IngredientsSection = forwardRef<
  HTMLHeadingElement,
  IIngredientsSectionProps
>(({ title, ingredients, inViewRef }, ref) => {
  return (
    <div className={`${styles.section}`}>
      <h2 ref={ref} className="title text text_type_main-medium mb-6">
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

export default IngredientsSection;
