import React from "react";
import ingredientType from "../../utils/types.js";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails.jsx";
import { useDispatch } from "react-redux";
import {
  setSelectedIngredient,
  resetSelectedIngredient,
} from "../../services/slices/ingredientDetailsSlice.js";
import { useDrag } from "react-dnd";

import styles from "./IngredientElement.module.scss";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientElement = ({ ingredient }) => {
  const { image, price, name, amount } = ingredient;
  const [isOpen, setIsOpen] = React.useState(false);
  const dispatch = useDispatch();

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
          setIsOpen(true);
          // dispatch(addIngredient(ingredient));
        }}
        ref={dragRef}
      >
        {amount > 0 && <Counter count={amount} size="default" />}
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
      {isOpen && (
        <Modal
          onClose={() => {
            dispatch(resetSelectedIngredient());
            setIsOpen(false);
          }}
        >
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
};

IngredientElement.propTypes = {
  ingredient: ingredientType.isRequired,
};

export default IngredientElement;
