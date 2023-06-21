import React from "react";
import styles from "./IngredientDetails.module.scss";
import { useSelector } from "react-redux";

const IngredientDetails = () => {
  const ingredient = useSelector(
    (state) => state.ingredientDetails.selectedIngredient
  );
  const { image_large, name, calories, proteins, fat, carbohydrates } =
    ingredient;

  return (
    <div className={styles.container}>
      <h2 className={`${styles.title} text text_type_main-large pl-10 pt-10`}>
        Детали ингредиента
      </h2>
      <div className={styles.wrapper}>
        <img src={image_large} alt="Ингредиент" className="mb-4" />
        <p className="text text_type_main-medium mb-8">{name}</p>
        <ul className={`${styles.details}`}>
          <li className={`${styles.item}`}>
            <p className="text text_type_main-default text_color_inactive">
              Калории,ккал
            </p>
            <p className="text text_type_main-medium text_color_inactive">
              {calories}
            </p>
          </li>
          <li className={`${styles.item}`}>
            <p className="text text_type_main-default text_color_inactive">
              Белки, г
            </p>
            <p className="text text_type_main-medium text_color_inactive">
              {proteins}
            </p>
          </li>
          <li className={`${styles.item}`}>
            <p className="text text_type_main-default text_color_inactive">
              Жиры, г
            </p>
            <p className="text text_type_main-medium text_color_inactive">
              {fat}
            </p>
          </li>
          <li className={`${styles.item}`}>
            <p className="text text_type_main-default text_color_inactive">
              Углеводы, г
            </p>
            <p className="text text_type_main-medium text_color_inactive">
              {carbohydrates}
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default IngredientDetails;
