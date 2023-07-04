import React, { useEffect } from "react";
import styles from "./profile-orders.module.scss";
import Orders from "../../../components/Orders/Orders";
import { checkUserAuth } from "../../../services/slices/auth/actions";
import { useDispatch } from "react-redux";

const ProfileOrders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserAuth());
    console.log("called2");
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <Orders />
    </div>
  );
};

export default ProfileOrders;
