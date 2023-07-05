import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import styles from "./CardImages.module.scss";

const CardImages = ({ ingredientsImages }) => {
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

CardImages.propTypes = {
  ingredientsImages: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CardImages;
