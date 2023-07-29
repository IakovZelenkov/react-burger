import React, { useRef, useCallback } from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ConstructorIngredient.module.scss";
import {
  deleteIngredient,
  decreaseIngredientCount,
} from "../../../services/slices/burgerConstructorSlice";
import { XYCoord, useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { moveIngredient } from "../../../services/slices/burgerConstructorSlice";
import { useAppDispatch } from "../../../services/hooks/hooks";
import { IngredientType } from "../../../services/types/types";

type ConstructorIngredientProps = {
  item: IngredientType;
  index: number;
};

const ConstructorIngredient: React.FC<ConstructorIngredientProps> = ({
  item,
  index,
}) => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const updateIngredientsOrder = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      dispatch(moveIngredient({ dragIndex, hoverIndex }));
    },
    [dispatch]
  );

  const [{ handlerId }, drop] = useDrop({
    accept: "item",
    collect(monitor: DropTargetMonitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any, monitor) {
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

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

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
        <DragIcon type="primary" />
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
