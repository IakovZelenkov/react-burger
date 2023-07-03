import React from "react";
import styles from "./profile-orders.module.scss";
import Orders from "../../../components/Orders/Orders";

const ProfileOrders = () => {
  return (
    <div className={styles.container}>
      <Orders />
    </div>
  );
};

export default ProfileOrders;
