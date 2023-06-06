import React from "react";
import ingredientType from "../../../utils/types";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ConstructorIngredient.module.scss";
import { useDispatch } from "react-redux";
import {
  deleteIngredient,
  decreaseIngredientCount,
} from "../../../services/slices/burgerConstructorSlice";
import { useDrag, useDrop } from "react-dnd";
import { moveIngredient } from "../../../services/slices/burgerConstructorSlice";

const ConstructorIngredient = ({ item, index }) => {
  const dispatch = useDispatch();
  const ref = React.useRef(null);
  const updateIngredientsOrder = React.useCallback(
    (dragIndex, hoverIndex) => {
      dispatch(moveIngredient({ dragIndex, hoverIndex }));
    },
    [dispatch]
  );

  const [{ handlerId }, drop] = useDrop({
    accept: "item",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      updateIngredientsOrder(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "item",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div
      ref={ref}
      data-handler-id={handlerId}
      style={{ opacity }}
      className={styles.container}
    >
      <div className={styles.icon}>
        <DragIcon />
      </div>
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => {
          dispatch(deleteIngredient(item));
          dispatch(decreaseIngredientCount(item));
        }}
      />
    </div>
  );
};

export default ConstructorIngredient;

ConstructorIngredient.propTypes = {
  item: ingredientType.isRequired,
  index: PropTypes.number.isRequired,
};
