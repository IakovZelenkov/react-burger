import React, { useRef, useMemo, useEffect } from "react";
import styles from "./BurgerIngredients.module.scss";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsSection from "../IngredientsSection/IngredientsSection";
import { useInView } from "react-intersection-observer";
import { useAppSelector } from "../../services/hooks/hooks";
import { TIngredient } from "../../services/types/types";

const BurgerIngredients: React.FC = () => {
  const [inViewBun, bunInView] = useInView({ threshold: 0.5 });
  const [inViewMain, mainInView] = useInView({ threshold: 0.5 });
  const [inViewSauce, sauceInView] = useInView({ threshold: 0.5 });
  const [active, setActive] = React.useState<string>("");

  const bunRef = {
    titleRef: useRef<HTMLDivElement>(null),
    inViewRef: inViewBun,
  };
  const mainRef = {
    titleRef: useRef<HTMLDivElement>(null),
    inViewRef: inViewMain,
  };
  const sauceRef = {
    titleRef: useRef<HTMLDivElement>(null),
    inViewRef: inViewSauce,
  };

  const ingredients = useAppSelector(
    (state) => state.burgerIngredients.ingredients
  );

  useEffect(() => {
    if (bunInView) {
      setActive("bun");
    } else if (mainInView) {
      setActive("main");
    } else {
      setActive("sauce");
    }
  }, [bunInView, mainInView, sauceInView]);

  const ingredientsSorted = useMemo(() => {
    return ingredients.reduce(
      (acc: { [key: string]: TIngredient[] }, item: TIngredient) => {
        if (!acc[item.type]) {
          acc[item.type] = [];
        }
        acc[item.type].push(item);
        return acc;
      },
      {}
    );
  }, [ingredients]);

  return (
    <div className={styles.container}>
      <h1 className="title text text_type_main-large mb-5 pt-10">
        Соберите бургер
      </h1>

      <div className={`${styles.tabs} pb-10`}>
        <Tab
          active={active === "bun"}
          value="bun"
          onClick={() => {
            setActive("bun");
            bunRef.titleRef.current?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Булки
        </Tab>
        <Tab
          active={active === "main"}
          value="main"
          onClick={() => {
            setActive("main");
            mainRef.titleRef.current?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Начинки
        </Tab>
        <Tab
          active={active === "sauce"}
          value="sauce"
          onClick={() => {
            setActive("sauce");
            sauceRef.titleRef.current?.scrollIntoView({ behavior: "smooth" });
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
            // @ts-ignore Wrong type
            ref={bunRef}
          />
          <IngredientsSection
            title="Начинки"
            ingredients={ingredientsSorted.main}
            // @ts-ignore Wrong type
            ref={mainRef}
          />
          <IngredientsSection
            title="Соусы"
            ingredients={ingredientsSorted.sauce}
            // @ts-ignore Wrong type
            ref={sauceRef}
          />
        </div>
      )}
    </div>
  );
};

export default BurgerIngredients;
