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

import { createOrder } from "../../utils/burger-api";

import { useSelector, useDispatch } from "react-redux";

import {
  addIngredient,
  deleteIngredient,
  resetIngredients,
} from "../../services/slices/burgerConstructorSlice";

import {
  submitOrder,
  resetOrder,
} from "../../services/slices/orderDetailsSlice";

import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";

const BurgerConstructor = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [orderNumber, setOrderNumber] = React.useState(0);
  const dispatch = useDispatch();
  const ingredientsListRef = React.useRef();

  const { bun, ingredients } = useSelector((state) => ({
    bun: state.burgerConstructor.bun,
    ingredients: state.burgerConstructor.ingredients,
  }));

  const totalPrice =
    ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0) +
    (bun === undefined ? 0 : bun.price * 2);

  const handleDrop = (ingredient) => {
    if (ingredient.type !== "bun" && bun === undefined) {
      window.alert("Сначала добавьте булку");
      return;
    }
    dispatch(addIngredient({ uniqueID: uuidv4(), ingredient }));

    setTimeout(() => {
      ingredientsListRef.current.scroll({
        top: ingredientsListRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 50);
  };

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(ingredient) {
      handleDrop(ingredient);
    },
  });

  // const submitOrder = () => {
  //   const ingredientsId = ingredients.map((ingredient) => ingredient._id);
  //   ingredientsId.push(bun._id);
  //   ingredientsId.unshift(bun._id);
  //   createOrder(ingredientsId)
  //     .then((res) => {
  //       setOrderNumber(res.order.number);
  //       setIsOpen(true);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  const handleSubmitOrder = (bun, ingredients) => {
    console.log(ingredients);
    dispatch(submitOrder(bun, ingredients));
    setIsOpen(true);
    // dispatch();
  };

  return (
    <>
      <div className={`${styles.wrapper} mt-25 `}>
        <div
          className={
            isHover ? `${styles.hoverDND} mb-10` : `${styles.order} mb-10`
          }
          // className={`${isHover ? styles.hoverDND : ${styles.order}}  mb-10`}
          ref={dropTarget}
        >
          <div className={`${styles.item} pl-8`} style={{ minWidth: "568px" }}>
            {bun === undefined ? (
              <h3 className={`${styles.temp}`}>Перенесите сюда булку</h3>
            ) : (
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${bun.name} (верх)`}
                price={bun.price}
                thumbnail={bun.image}
              />
            )}
          </div>
          <ul className={`${styles.list} scroller`} ref={ingredientsListRef}>
            {ingredients.map((item, index) => (
              <li key={item._id + index} className={`${styles.item} pl-8`}>
                <div className={styles.icon}>
                  <DragIcon />
                </div>
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                  handleClose={() => dispatch(deleteIngredient(item))}
                />
              </li>
            ))}
          </ul>
          <div className={`${styles.item} pl-8`}>
            {bun === undefined ? (
              <></>
            ) : (
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${bun.name} (низ)`}
                price={bun.price}
                thumbnail={bun.image}
              />
            )}
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
            onClick={() => {
              handleSubmitOrder(bun, ingredients);
            }}
            disabled={!bun || ingredients.length === 0}
          >
            Оформить заказ
          </Button>
        </div>
      </div>
      {isOpen && (
        <Modal
          onClose={() => {
            dispatch(resetOrder());
            setIsOpen(false);
          }}
        >
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </>
  );
};

export default BurgerConstructor;
