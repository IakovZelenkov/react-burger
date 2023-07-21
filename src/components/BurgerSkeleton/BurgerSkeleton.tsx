import React from "react";
import s from "./BurgerSkeleton.module.scss";
import clsx from "clsx";

const BurgerSkeleton: React.FC = () => {
  return (
    <div className={s.container}>
      <div className={clsx(s.item, s.top)}></div>
      <div className={clsx(s.item, s.middle)}></div>
      <div className={clsx(s.item, s.middle)}></div>
      <div className={clsx(s.item, s.bottom)}></div>
      <span className="text text_type_main-default">
        Добавьте свои ингредиенты
      </span>
    </div>
  );
};

export default BurgerSkeleton;
