import React from "react";
import styles from "./not-found.module.scss";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <p className="text text_type_digits-medium">
        404 <span className="text text_type_main-large">Not Found</span>
      </p>
      <p className="text text_type_main-medium">
        Такой страницы не существует
      </p>
    </div>
  );
};

export default NotFound;
