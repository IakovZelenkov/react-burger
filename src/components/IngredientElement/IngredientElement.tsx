import React from "react";
import styles from "./IngredientElement.module.scss";
import { useAppSelector } from "../../services/hooks/hooks";
import { useDrag } from "react-dnd";
import { useLocation, Link } from "react-router-dom";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { IIngredient } from "../../services/types/types";

type IngredientElementProps = {
  ingredient: IIngredient;
};

const IngredientElement: React.FC<IngredientElementProps> = ({
  ingredient,
}) => {
  const location = useLocation();

  const { image, price, name, _id } = ingredient;
  const ingredientsCount = useAppSelector(
    (state) => state.burgerConstructor.ingredientsCount
  );

  const [, dragRef, dragPreviewRef] = useDrag({
    type: "ingredient",
    item: ingredient,
  });

  return (
    <li className={styles.listItem}>
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
    </li>
  );
};

export default IngredientElement;
