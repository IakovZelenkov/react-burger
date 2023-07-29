import React, { useEffect } from "react";
import styles from "./profile-orders.module.scss";
import Orders from "../../../components/Orders/Orders";
import { checkUserAuth } from "../../../services/slices/auth/actions";
import { useAppDispatch } from "../../../services/hooks/hooks";

const ProfileOrders: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <Orders />
    </div>
  );
};

export default ProfileOrders;
