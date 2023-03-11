import React from "react";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.scss";

const BurgerConstructor = ({ order }) => {
  const totalPrice = order.reduce(
    (acc, ingredient) => acc + ingredient.price,
    0
  );
  const notBuns = order.filter((item) => item.type !== "bun");
  const buns = order.filter((obj) => obj.type === "bun");

  return (
    <div className={`${styles.wrapper} mt-25 `}>
      <div className={`${styles.order} mb-10`}>
        <div className={`${styles.item} pl-8`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={buns[0].name}
            price={buns[0].price}
            thumbnail={buns[0].image}
          />
        </div>
        <ul className={`${styles.list} scroller`}>
          {notBuns.map((item, index) => (
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
            text={buns[1].name}
            price={buns[1].price}
            thumbnail={buns[1].image}
          />
        </div>
      </div>
      <div className={`${styles.info} pr-4`}>
        <p className={`${styles.price} text text_type_digits-medium mr-10`}>
          <span>{totalPrice}</span>

          <CurrencyIcon type="primary" />
        </p>
        <Button htmlType="button" type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

export default BurgerConstructor;
