import React from "react";
import ingredientType from "../../utils/types.js";
import IngredientDetails from "../IngredientDetails/IngredientDetails.jsx";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedIngredient,
  resetSelectedIngredient,
} from "../../services/slices/ingredientDetailsSlice.js";
import { useDrag } from "react-dnd";
import { openIngredientDetailsModal } from "../../services/slices/modalSlice.js";

import styles from "./IngredientElement.module.scss";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientElement = ({ ingredient }) => {
  const { image, price, name, _id } = ingredient;
  const dispatch = useDispatch();
  const ingredientsCount = useSelector(
    (state) => state.burgerConstructor.ingredientsCount
  );

  const [, dragRef, dragPreviewRef] = useDrag({
    type: "ingredient",
    item: ingredient,
  });

  return (
    <>
      <li
        className={`${styles.wrapper}`}
        onClick={() => {
          dispatch(setSelectedIngredient(ingredient));
          dispatch(openIngredientDetailsModal());
        }}
        ref={dragRef}
      >
        {ingredientsCount[_id] > 0 && (
          <Counter count={ingredientsCount[_id]} size="default" />
        )}
        <img
          src={image}
          alt="Ингредиент"
          className={styles.image}
          ref={dragPreviewRef}
        />
        <div className={styles.priceInfo}>
          <span className="text text_type_main-medium">{price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default">{name}</p>
      </li>
    </>
  );
};

IngredientElement.propTypes = {
  ingredient: ingredientType.isRequired,
};

export default IngredientElement;
