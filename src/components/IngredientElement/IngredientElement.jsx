import React from "react";
import styles from "./IngredientElement.module.scss";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientElement = ({ image, price, name, __v }) => {
  return (
    <li className={`${styles.wrapper}`}>
      {__v > 0 && <Counter count={__v} size="default" />}
      <img src={image} alt="Ингредиент" className={styles.image} />
      <div className={styles.priceInfo}>
        <span className="text text_type_main-medium">{price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{name}</p>
    </li>
  );
};

export default IngredientElement;
