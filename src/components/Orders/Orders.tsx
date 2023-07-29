import React, { useEffect } from "react";
import Cookies from "js-cookie";
import styles from "./Orders.module.scss";
import { WebsocketStatus } from "../../utils/constants";
import { useMatch } from "react-router-dom";
import {
  connect,
  disconnect,
} from "../../services/slices/orders-feed/actions";
import { PROFILE_ORDERS_URL, ALL_ORDERS_URL } from "../../utils/constants";
import Loader from "../Loader/Loader";
import OrderCard from "../OrderCard/OrderCard";
import { useAppSelector, useAppDispatch } from "../../services/hooks/hooks";
import { OrderType } from "../../services/types/types";

const Orders: React.FC = () => {
  const { orders, status } = useAppSelector((state) => state.ordersFeed);
  const dispatch = useAppDispatch();
  const isLoading = status === WebsocketStatus.CONNECTING;

  const match = useMatch({
    path: "/profile/orders",
    end: true,
  });

  useEffect(() => {
    if (match) {
      const token = Cookies.get("accessToken");
      dispatch(connect(`${PROFILE_ORDERS_URL}?token=${token}`));
    } else {
      dispatch(connect(ALL_ORDERS_URL));
    }
    return () => {
      dispatch(disconnect());
    };
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <h2 className="text text_type_main-large">Загрузка...</h2>
        <Loader />
      </div>
    );
  }

  if (orders === null || orders === undefined || orders.length === 0) {
    return (
      <div className={styles.container}>
        <h2 className="text text_type_main-large">Заказов еще нет</h2>
      </div>
    );
  }

  const checkOrder = (order: OrderType) => {
    return (
      order.ingredients !== undefined &&
      order.ingredients !== null &&
      order.ingredients.length > 0
    );
  };

  const reversedOrders = match !== null ? [...orders].reverse() : orders;

  return (
    <ul className={`${styles.wrapper} scroller`}>
      {reversedOrders.map((order) =>
        checkOrder(order) ? (
          <li key={order.number}>
            <OrderCard order={order} isProfile={match !== null} />
          </li>
        ) : (
          ""
        )
      )}
    </ul>
  );
};

export default Orders;
