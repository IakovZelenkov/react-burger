import React from "react";
import styles from "./ingredients.module.scss";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const IngredientsPage = () => {
  const { ingredientId } = useParams();
  const ingredients = useSelector(
    (state) => state.burgerIngredients.ingredients
  );
  const ingredient = ingredients.find((item) => item._id === ingredientId);

  return (
    <>
      {ingredient && (
        <div className={styles.container}>
          <h2 className={`${styles.title} text text_type_main-large`}>
            Детали ингредиента
          </h2>
          <div className={styles.wrapper}>
            <img
              src={ingredient.image_large}
              alt="Ингредиент"
              className="mb-4"
            />
            <p className={"text text_type_main-medium"}>{ingredient.name}</p>
            <ul className={`${styles.details}`}>
              <li className={`${styles.item}`}>
                <p className="text text_type_main-default text_color_inactive">
                  Калории,ккал
                </p>
                <p className="text text_type_digits-default text_color_inactive">
                  {ingredient.calories}
                </p>
              </li>
              <li className={`${styles.item}`}>
                <p className="text text_type_main-default text_color_inactive">
                  Белки, г
                </p>
                <p className="text text_type_digits-default text_color_inactive">
                  {ingredient.proteins}
                </p>
              </li>
              <li className={`${styles.item}`}>
                <p className="text text_type_main-default text_color_inactive">
                  Жиры, г
                </p>
                <p className="text text_type_digits-default text_color_inactive">
                  {ingredient.fat}
                </p>
              </li>
              <li className={`${styles.item}`}>
                <p className="text text_type_main-default text_color_inactive">
                  Углеводы, г
                </p>
                <p className="text text_type_digits-default text_color_inactive">
                  {ingredient.carbohydrates}
                </p>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default IngredientsPage;
