import React from "react";
import PropTypes from "prop-types";
import ingredientType from "../../utils/types.js";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails.jsx";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.scss";

const BurgerConstructor = ({ data }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { bun, ingredients } = {
    bun: data.find((item) => item.type === "bun"),
    ingredients: data.filter((item) => item.type !== "bun"),
  };

  const totalPrice =
    ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0) +
    bun.price * 2;

  return (
    <>
      <div className={`${styles.wrapper} mt-25 `}>
        <div className={`${styles.order} mb-10`}>
          <div className={`${styles.item} pl-8`}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
          <ul className={`${styles.list} scroller`}>
            {ingredients.map((item, index) => (
              <li key={item._id + index} className={`${styles.item} pl-8`}>
                <div className={styles.icon}>
                  <DragIcon />
                </div>
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              </li>
            ))}
          </ul>
          <div className={`${styles.item} pl-8`}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        </div>
        <div className={`${styles.info} pr-4`}>
          <p className={`${styles.price} text text_type_digits-medium mr-10`}>
            <span>{totalPrice}</span>

            <CurrencyIcon type="primary" />
          </p>
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            onClick={() => setIsOpen(true)}
          >
            Оформить заказ
          </Button>
        </div>
      </div>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
};

export default BurgerConstructor;
