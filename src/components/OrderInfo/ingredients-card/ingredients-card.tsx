import React from "react";
import styles from "./ingredients-card.module.scss";
import { Link } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface IngredientCardProps {
  name: string;
  image: string;
  count: number;
  price: number;
  ingredientId: string;
}

const IngredientCard: React.FC<IngredientCardProps> = ({
  name,
  image,
  count,
  price,
  ingredientId,
}) => {
  return (
    <Link
      to={`/ingredients/${ingredientId}`}
      className={`${styles.container}`}
    >
      <div className={styles.border}>
        <div className={styles.item}>
          <img className={styles.image} src={image} alt="Фото ингредиента" />
        </div>
      </div>
      <span className="text text_type_main-default">{name}</span>
      <div className={styles.price}>
        <span className="text text_type_digits-default">
          {count} x {price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
    </Link>
  );
};

export default IngredientCard;
