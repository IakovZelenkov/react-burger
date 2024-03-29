import React, { useMemo } from "react";
import { useAppSelector } from "../../services/hooks/hooks";
import styles from "./OrdersSummary.module.scss";

const OrdersSummary: React.FC = () => {
  const { orders, total, totalToday } = useAppSelector(
    (state) => state.ordersFeed
  );

  const doneOrders = useMemo(() => {
    return orders.filter((order) => order.status === "done").slice(0, 15);
  }, [orders]);

  const pendingOrders = useMemo(() => {
    return orders.filter((order) => order.status === "pending").slice(0, 15);
  }, [orders]);

  return (
    <div className={styles.container}>
      <div className={styles.status}>
        <div className={styles.column}>
          <h2 className="text text_type_main-medium">Готовы:</h2>
          <ul className={styles.list}>
            {doneOrders.map((order) => {
              return (
                <li
                  className={`${styles.done} text text_type_digits-default`}
                  key={order._id}
                >
                  {order.number}
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles.column}>
          <h2 className="text text_type_main-medium">В работе:</h2>
          <ul className={styles.list}>
            {pendingOrders.map((order) => {
              return (
                <li
                  className={`${styles.pending} text text_type_digits-default`}
                  key={order._id}
                >
                  {order.number}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div>
        <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
        <span className={`${styles.digits} text text_type_digits-large`}>
          {total}
        </span>
      </div>
      <div>
        <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
        <span className={`${styles.digits} text text_type_digits-large`}>
          {totalToday}
        </span>
      </div>
    </div>
  );
};

export default OrdersSummary;
