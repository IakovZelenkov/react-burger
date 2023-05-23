import React from "react";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails.jsx";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.scss";

import { BurgerIngredientsContext, reducer } from "../../services/appContext";

import { createOrder } from "../../utils/burger-api";

const BurgerConstructor = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { items } = React.useContext(BurgerIngredientsContext);
  const [orderNumber, setOrderNumber] = React.useState(0);

  // const totalPriceInitialState = { price: 0 };

  // const [totalPriceState, totalPriceDispatcher] = React.useReducer(
  //   reducer,
  //   totalPriceInitialState
  // );

  const { bun, ingredients } = {
    bun: items.find((item) => item.type === "bun"),
    ingredients: items.filter((item) => item.type !== "bun"),
  };

  // React.useEffect(() => {
  //   if (bun) {
  //     totalPriceDispatcher({ type: "add", payload: bun.price * 2 });
  //   }
  //   if (ingredients) {
  //     totalPriceDispatcher({
  //       type: "add",
  //       payload: ingredients.reduce(
  //         (acc, ingredient) => acc + ingredient.price,
  //         0
  //       ),
  //     });
  //   }
  // }, [items]);

  // const totalPrice =
  //   ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0) +
  //   bun.price * 2;

  const totalPrice = React.useMemo(() => {
    return (
      ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0) +
      bun.price * 2
    );
  }, [bun, ingredients]);

  const submitOrder = () => {
    const ingredientsId = items.map((ingredient) => ingredient._id);
    ingredientsId.push(bun._id);
    createOrder(ingredientsId)
      .then((res) => {
        setOrderNumber(res.order.number);
        setIsOpen(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

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
            onClick={submitOrder}
          >
            Оформить заказ
          </Button>
        </div>
      </div>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </>
  );
};

export default BurgerConstructor;
