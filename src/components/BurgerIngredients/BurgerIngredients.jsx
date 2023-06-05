import React from "react";
import styles from "./BurgerIngredients.module.scss";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import IngredientDetails from "../IngredientDetails/IngredientDetails";
import IngredientsSection from "../IngredientsSection/IngredientsSection";
import Modal from "../Modal/Modal";

import { useSelector, useDispatch } from "react-redux";
import { useInView } from "react-intersection-observer";

import { closeIngredientDetailsModal } from "../../services/slices/modalSlice";
import { resetSelectedIngredient } from "../../services/slices/ingredientDetailsSlice";

const BurgerIngredients = () => {
  const [inViewBun, bunInView] = useInView({ threshold: 0.5 });
  const [inViewMain, mainInView] = useInView({ threshold: 0.5 });
  const [inViewSauce, sauceInView] = useInView({ threshold: 0.5 });
  const [active, setActive] = React.useState("");
  const dispatch = useDispatch();
  const ingredientDetailsModalOpen = useSelector(
    (state) => state.modal.ingredientDetailsModalOpen
  );

  const bunRef = {
    titleRef: React.useRef(),
    inViewRef: inViewBun,
  };
  const mainRef = {
    titleRef: React.useRef(),
    inViewRef: inViewMain,
  };
  const sauceRef = {
    titleRef: React.useRef(),
    inViewRef: inViewSauce,
  };

  const ingredients = useSelector(
    (state) => state.burgerIngredients.ingredients
  );

  React.useEffect(() => {
    if (bunInView) {
      setActive("bun");
    } else if (mainInView) {
      setActive("main");
    } else {
      setActive("sauce");
    }
  }, [bunInView, mainInView, sauceInView]);

  const ingredientsSorted = React.useMemo(() => {
    return ingredients.reduce((acc, item) => {
      if (!acc[item.type]) {
        acc[item.type] = [];
      }
      acc[item.type].push(item);
      return acc;
    }, {});
  }, [ingredients]);

  return (
    <div className={styles.container}>
      <h1 className="title text text_type_main-large mb-5 pt-10">
        Соберите бургер
      </h1>

      <div className={`${styles.tabs} pb-10`}>
        <Tab
          active={active === "bun"}
          onClick={() => {
            setActive();
            bunRef.titleRef.current.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Булки
        </Tab>
        <Tab
          active={active === "main"}
          onClick={() => {
            setActive();
            mainRef.titleRef.current.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Начинки
        </Tab>
        <Tab
          active={active === "sauce"}
          onClick={() => {
            setActive();
            sauceRef.titleRef.current.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Соусы
        </Tab>
      </div>
      {ingredientsSorted.bun && (
        <div className={`${styles.wrapper} scroller`}>
          <IngredientsSection
            title="Булки"
            ingredients={ingredientsSorted.bun}
            ref={bunRef}
          />
          <IngredientsSection
            title="Начинки"
            ingredients={ingredientsSorted.main}
            ref={mainRef}
          />
          <IngredientsSection
            title="Соусы"
            ingredients={ingredientsSorted.sauce}
            ref={sauceRef}
          />
        </div>
      )}
      {ingredientDetailsModalOpen && (
        <Modal
          onClose={() => {
            dispatch(closeIngredientDetailsModal());
            dispatch(resetSelectedIngredient());
          }}
        >
          <IngredientDetails />
        </Modal>
      )}
    </div>
  );
};

export default BurgerIngredients;
