import React from "react";
import styles from "./IngredientElement.module.scss";
import ingredientType from "../../utils/types.js";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { useLocation, Link } from "react-router-dom";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientElement = ({ ingredient }) => {
  const location = useLocation();

  const { image, price, name, _id } = ingredient;
  const ingredientsCount = useSelector(
    (state) => state.burgerConstructor.ingredientsCount
  );

  const [, dragRef, dragPreviewRef] = useDrag({
    type: "ingredient",
    item: ingredient,
  });

  return (
    <Link
      to={`/ingredients/${ingredient._id}`}
      state={{ backgroundLocation: location }}
      className={`${styles.link}`}
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
    </Link>
  );
};

IngredientElement.propTypes = {
  ingredient: ingredientType.isRequired,
};

export default IngredientElement;
