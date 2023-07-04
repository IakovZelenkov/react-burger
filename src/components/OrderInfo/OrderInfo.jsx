import React, { useEffect } from "react";
import styles from "./OrderInfo.module.scss";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../services/slices/orderDetailsSlice";
import Loader from "../Loader/Loader";
import IngredientCard from "./ingredients-card/ingredients-card";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";

const OrderInfo = () => {
  const dispatch = useDispatch();
  const { orderNumber } = useParams();
  const { order, loading } = useSelector((state) => state.orderDetails);
  const { ingredients } = useSelector((state) => state.burgerIngredients);
  const location = useLocation();

  const orderIngredients = order.ingredients?.reduce((accumulator, id) => {
    const ingredient = ingredients.find((ingredient) => ingredient._id === id);
    if (ingredient) {
      const existingIngredient = accumulator.find(
        (item) => item.name === ingredient.name
      );
      if (existingIngredient) {
        existingIngredient.count++;
      } else {
        accumulator.push({
          name: ingredient.name,
          image: ingredient.image_mobile,
          price: ingredient.price,
          ingredientId: ingredient._id,
          count: 1,
        });
      }
    }
    return accumulator;
  }, []);

  const totalPrice = orderIngredients?.reduce((sum, ingredient) => {
    return sum + ingredient.price * ingredient.count;
  }, 0);

  useEffect(() => {
    dispatch(getOrder(orderNumber));
  }, [dispatch]);

  const orderStatus = () => {
    let text = "Создан";
    let className = styles.created;

    switch (order.status) {
      case "pending":
        text = "Готовится";
        className = styles.pending;
        break;
      case "done":
        text = "Выполнен";
        className = styles.order_done;
        break;
      default:
        return null;
    }

    return <span className={className}>{text}</span>;
  };

  if (loading === "pending") {
    return (
      <div className={styles.container}>
        <Loader />
      </div>
    );
  }

  return (
    <div
      className={
        styles.container + (location.state ? "" : ` ${styles.container_page}`)
      }
    >
      <p
        className={
          `text text_type_digits-default mb-5` +
          (location.state ? ` ${styles.number_modal}` : "")
        }
      >{`#${order.number}`}</p>
      <div className={styles.wrapper}>
        <span className="text text_type_main-medium ">{order.name}</span>
        {orderStatus()}
      </div>
      <div className={styles.ingredients}>
        <span className="text text_type_main-medium">Состав:</span>
        <ul className={`${styles.list} scroller`}>
          {orderIngredients?.map((ingredient, index) => (
            <li key={index}>
              <IngredientCard
                name={ingredient.name}
                image={ingredient.image}
                count={ingredient.count}
                price={ingredient.price}
                ingredientId={ingredient.ingredientId}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.info}>
        <FormattedDate
          date={new Date(order.createdAt)}
          className={"text text_type_main-default text_color_inactive"}
        />
        <div className={styles.price}>
          <span className="text text_type_digits-default text pr-2">
            {totalPrice}
          </span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
