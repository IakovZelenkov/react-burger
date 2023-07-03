import React from "react";
import styles from "./OrderCard.module.scss";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import CardImages from "./CardImages/CardImages";

const OrderCard = ({ order, isProfile }) => {
  const { ingredients } = useSelector((state) => state.burgerIngredients);
  const location = useLocation();

  const ingredientsImages = order?.ingredients.map((id) => {
    const ingredient = ingredients.find((ingredient) => ingredient._id === id);
    return ingredient ? ingredient.image_mobile : "";
  });

  const ingredientsPrice = order?.ingredients.map((id) => {
    const ingredient = ingredients.find((ingredient) => ingredient._id === id);
    return ingredient ? ingredient.price : "";
  });

  const totalPrice = ingredientsPrice.reduce((a, b) => a + b);

  if (ingredientsImages.includes("")) {
    return null;
  }

  let path;

  if (isProfile) {
    path = `/profile/orders/${order.number}`;
  } else {
    path = `${order.number}`;
  }
  const orderStatus = () => {
    let text = "";
    let className = "";

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

OrderCard.propTypes = {
  order: PropTypes.object.isRequired,
  status: PropTypes.bool,
};

export default OrderCard;
