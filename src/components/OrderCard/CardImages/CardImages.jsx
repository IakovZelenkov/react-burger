import React from "react";
import PropTypes from "prop-types";
import styles from "./CardImages.module.scss";

const CardImages = ({ ingredientsImages }) => {
  const maxVisibleImages = 6;
  const remainingIngredientsCount =
    ingredientsImages.length - maxVisibleImages + 1;
  return (
    <div className={styles.container}>
      {ingredientsImages.slice(0, 6).map((image, index) => (
        <div
          className={styles.border}
          key={index}
          style={{ zIndex: maxVisibleImages - index }}
        >
          <div
            className={`${styles.item} ${
              index === maxVisibleImages - 1 ? styles.last_item : ""
            }`}
          >
            <img className={styles.image} src={image} alt="Фото ингредиента" />
          </div>
          {index === maxVisibleImages - 1 && remainingIngredientsCount > 0 && (
            <span
              className={`${styles.count} text text_type_digits-default`}
            >{`+${remainingIngredientsCount}`}</span>
          )}
        </div>
      ))}
    </div>
  );
};

CardImages.propTypes = {
  ingredientsImages: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CardImages;
