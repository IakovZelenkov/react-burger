import React from "react";
import PropTypes from "prop-types";
import styles from "./IngredientElement.module.scss";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientElement = ({ image, price, name, amount }) => {
  return (
    <li className={`${styles.wrapper}`}>
      {amount > 0 && <Counter count={amount} size="default" />}
      <img src={image} alt="Ингредиент" className={styles.image} />
      <div className={styles.priceInfo}>
        <span className="text text_type_main-medium">{price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{name}</p>
    </li>
  );
};

IngredientElement.propTypes = {
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  amount: PropTypes.number,
};

export default IngredientElement;
