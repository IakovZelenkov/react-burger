import React from "react";
import styles from "./OrderDetails.module.scss";
import doneIcon from "../../images/doneIcon.svg";

const OrderDetails = () => {
  return (
    <div className={styles.container}>
      <h2
        className={`${styles.numbers} text text_type_digits-large pt-30 mb-8`}
      >
        034536
      </h2>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img src={doneIcon} alt="Иконка успешного заказа" className="mb-15" />
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <span className="text text_type_main-default mb-30 text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </span>
    </div>
  );
};

export default OrderDetails;
