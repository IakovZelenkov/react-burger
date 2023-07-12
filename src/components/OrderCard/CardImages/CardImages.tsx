import React from "react";
import clsx from "clsx";
import styles from "./CardImages.module.scss";

interface CardImagesProps {
  ingredientsImages: string[];
}

const CardImages: React.FC<CardImagesProps> = ({ ingredientsImages }) => {
  const maxVisibleImages = 6;
  const remainingIngredientsCount =
    ingredientsImages.length - maxVisibleImages + 1;

  return (
    <div className={styles.container}>
      {ingredientsImages.slice(0, 6).map((image, index) => {
        const isLastItem = index === maxVisibleImages - 1;
        return (
          <div
            className={styles.border}
            key={index}
            style={{ zIndex: maxVisibleImages - index }}
          >
            <div
              className={clsx(styles.item, {
                [styles.last_item]: isLastItem,
              })}
            >
              <img className={styles.image} src={image} alt="Ингредиент" />
            </div>
            {isLastItem && remainingIngredientsCount > 0 && (
              <span
                className={clsx(styles.count, "text text_type_digits-default")}
              >
                {`+${remainingIngredientsCount}`}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CardImages;
