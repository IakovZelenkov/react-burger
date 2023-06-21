import React from "react";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails.jsx";
import Loader from "../Loader/Loader";
import ConstructorIngredient from "./ConstructorIngredient/ConstructorIngredient";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.scss";

import { useSelector, useDispatch } from "react-redux";

import {
  addIngredient,
  resetIngredients,
  increaseIngredientCount,
  resetIngredientCount,
} from "../../services/slices/burgerConstructorSlice";

import {
  submitOrder,
  resetOrder,
} from "../../services/slices/orderDetailsSlice";

import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";

import {
  openOrderDetailsModal,
  closeOrderDetailsModalOpen,
} from "../../services/slices/modalSlice.js";
import { useNavigate } from "react-router-dom";

const BurgerConstructor = () => {
  const orderDetailsModalOpen = useSelector(
    (state) => state.modal.orderDetailsModalOpen
  );

  const dispatch = useDispatch();
  const ingredientsListRef = React.useRef();
  const { user } = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const { bun, ingredients, orderNumber } = useSelector((state) => ({
    bun: state.burgerConstructor.bun,
    ingredients: state.burgerConstructor.ingredients,
    orderNumber: state.orderDetails.orderNumber,
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
    dispatch(increaseIngredientCount(ingredient));

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

  const createOrder = () => {
    if (user === null) {
      navigate("/login");
    } else {
      dispatch(submitOrder(bun, ingredients));
      dispatch(openOrderDetailsModal());
    }
  };

  return (
    <>
      <div className={`${styles.wrapper} mt-25 `}>
        <div
          className={
            isHover ? `${styles.hoverDND} mb-10` : `${styles.order} mb-10`
          }
          ref={dropTarget}
        >
          <div className={`${styles.item} pl-8`}>
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
              <li key={item.uniqueID} className={`${styles.item} pl-8`}>
                <ConstructorIngredient item={item} index={index} />
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
              createOrder();
            }}
            disabled={!bun || ingredients.length === 0}
          >
            Оформить заказ
          </Button>
        </div>
      </div>
      {orderDetailsModalOpen && (
        <Modal
          onClose={() => {
            dispatch(closeOrderDetailsModalOpen());
            dispatch(resetOrder());
            dispatch(resetIngredients());
            dispatch(resetIngredientCount());
          }}
        >
          {orderNumber === undefined ? <Loader /> : <OrderDetails />}
          {/* <Loader /> */}
        </Modal>
      )}
    </>
  );
};

export default BurgerConstructor;
