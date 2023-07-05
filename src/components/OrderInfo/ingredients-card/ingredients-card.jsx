import React from "react";
import styles from "./ingredients-card.module.scss";
import PropTypes from "prop-types";
import { useLocation, Link } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientCard = ({ name, image, count, price, ingredientId }) => {
  const location = useLocation();
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
        <CurrencyIcon />
      </div>
    </Link>
  );
};

IngredientCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  ingredientId: PropTypes.string.isRequired,
};

export default IngredientCard;
