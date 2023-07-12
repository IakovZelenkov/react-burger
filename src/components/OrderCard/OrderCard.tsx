import React from "react";
import styles from "./OrderCard.module.scss";
import { Link, useLocation } from "react-router-dom";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import CardImages from "./CardImages/CardImages";
import { OrderType } from "../../services/types/types";
import { useAppSelector } from "../../services/hooks/hooks";

interface OrderCardProps {
  order: OrderType;
  isProfile: boolean;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, isProfile }) => {
  const ingredients = useAppSelector(
    (state) => state.burgerIngredients.ingredients
  );
  const location = useLocation();

  const ingredientsImages = order?.ingredients.map((id) => {
    const ingredient = ingredients.find((ingredient) => ingredient._id === id);
    return ingredient ? ingredient.image_mobile : "";
  });

  const ingredientsPrice = order?.ingredients.map((id) => {
    const ingredient = ingredients.find((ingredient) => ingredient._id === id);
    return ingredient ? ingredient.price : 0;
  });

  if (ingredientsImages.includes("")) {
    return null;
  }

  const totalPrice = ingredientsPrice.reduce((a: number, b: number) => a + b);

  let path;

  if (isProfile) {
    path = `/profile/orders/${order.number}`;
  } else {
    path = `/feed/${order.number}`;
  }
  const orderStatus = () => {
    let text = "Создан";
    let className = styles.created;

    switch (order.status) {
      case "created":
        text = "Создан";
        className = styles.created;
        break;
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

  return (
    <Link
      to={path}
      state={{ backgroundLocation: location }}
      className={`${styles.card}`}
    >
      <div className={`${styles.info}`}>
        <span className="text text_type_digits-default">{`#${order.number}`}</span>
        <FormattedDate
          date={new Date(order.createdAt)}
          className={"text text_type_main-default text_color_inactive"}
        />
      </div>
      <div className={styles.wrapper}>
        <span className="text text_type_main-medium">{order.name}</span>
        {isProfile && orderStatus()}
      </div>

      <div className={styles.content}>
        <CardImages ingredientsImages={ingredientsImages} />
        <div className={styles.price}>
          <span className="text text_type_digits-default text pr-2">
            {totalPrice}
          </span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;
