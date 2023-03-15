import React from "react";
import ingredientType from "../../utils/types.js";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails.jsx";

import styles from "./IngredientElement.module.scss";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientElement = ({ ingredient }) => {
  const { image, price, name, amount } = ingredient;
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <li className={`${styles.wrapper}`} onClick={() => setIsOpen(true)}>
        {amount > 0 && <Counter count={amount} size="default" />}
        <img src={image} alt="Ингредиент" className={styles.image} />
        <div className={styles.priceInfo}>
          <span className="text text_type_main-medium">{price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default">{name}</p>
      </li>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      )}
    </>
  );
};

IngredientElement.propTypes = {
  ingredient: ingredientType.isRequired,
};

export default IngredientElement;
