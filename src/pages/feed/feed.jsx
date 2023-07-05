import React from "react";
import styles from "./feed.module.scss";
import Orders from "../../components/Orders/Orders";
import OrdersSummary from "../../components/OrdersSummary/OrdersSummary";

const FeedPage = () => {
  return (
    <div className={styles.container}>
      <h2 className="text text_type_main-large">Лента заказов</h2>
      <div className={styles.orders}>
        <Orders />
        <OrdersSummary />
      </div>
    </div>
  );
};

export default FeedPage;
