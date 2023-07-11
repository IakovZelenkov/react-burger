import React, { useRef, useMemo, useEffect } from "react";
import styles from "./BurgerIngredients.module.scss";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsSection from "../IngredientsSection/IngredientsSection";
import { useInView } from "react-intersection-observer";
import { useAppSelector } from "../../services/hooks/hooks";
import { IIngredient } from "../../services/types/types";

const BurgerIngredients: React.FC = () => {
  const [inViewBun, bunInView] = useInView({ threshold: 0.5 });
  const [inViewMain, mainInView] = useInView({ threshold: 0.5 });
  const [inViewSauce, sauceInView] = useInView({ threshold: 0.5 });
  const [active, setActive] = React.useState<string>("");

  // const bunRef = {
  //   titleRef: useRef<HTMLHeadingElement>(null),
  //   inViewRef: inViewBun,
  // };
  // const mainRef = {
  //   titleRef: useRef<HTMLHeadingElement>(null),
  //   inViewRef: inViewMain,
  // };
  // const sauceRef = {
  //   titleRef: useRef<HTMLHeadingElement>(null),
  //   inViewRef: inViewSauce,
  // };

  const bunRef = useRef<HTMLHeadingElement>(null);
  const mainRef = useRef<HTMLHeadingElement>(null);
  const sauceRef = useRef<HTMLHeadingElement>(null);

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
      (acc: { [key: string]: IIngredient[] }, item: IIngredient) => {
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
            bunRef.current?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Булки
        </Tab>
        <Tab
          active={active === "main"}
          value="main"
          onClick={() => {
            setActive("main");
            mainRef.current?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Начинки
        </Tab>
        <Tab
          active={active === "sauce"}
          value="sauce"
          onClick={() => {
            setActive("sauce");
            sauceRef.current?.scrollIntoView({ behavior: "smooth" });
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
            inViewRef={inViewBun}
          />
          <IngredientsSection
            title="Начинки"
            ingredients={ingredientsSorted.main}
            ref={mainRef}
            inViewRef={inViewMain}
          />
          <IngredientsSection
            title="Соусы"
            ingredients={ingredientsSorted.sauce}
            ref={sauceRef}
            inViewRef={inViewSauce}
          />
        </div>
      )}
    </div>
  );
};

export default BurgerIngredients;
