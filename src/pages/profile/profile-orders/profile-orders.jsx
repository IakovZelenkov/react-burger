import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  connect,
  disconnect,
} from "../../../services/slices/orders-feed/actions";

const URL = "wss://norma.nomoreparties.space/orders/all";

const ProfileOrders = () => {
  const { orders } = useSelector((state) => state.ordersFeed);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(connect(URL));
  //   return () => {
  //     dispatch(disconnect());
  //   };
  // }, [dispatch]);

  return <div>ProfileOrders</div>;
};

export default ProfileOrders;
