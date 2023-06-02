import React from "react";
import styles from "./BurgerIngredients.module.scss";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import IngredientsSection from "../IngredientsSection/IngredientsSection";

import { useSelector, useDispatch } from "react-redux";
import { useInView } from "react-intersection-observer";

const BurgerIngredients = () => {
  const [inViewBun, bunInView] = useInView({ threshold: 0.5 });
  const [inViewMain, mainInView] = useInView({ threshold: 0.5 });
  const [inViewSauce, sauceInView] = useInView({ threshold: 0.5 });
  const [active, setActive] = React.useState("");

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

  const { buns, mains, sauces } = React.useMemo(() => {
    return ingredients.reduce(
      (count, item) => {
        switch (item.type) {
          case "bun":
            count.buns.push(item);
            break;
          case "sauce":
            count.sauces.push(item);
            break;
          case "main":
            count.mains.push(item);
            break;
          default:
            break;
        }
        return count;
      },
      { buns: [], mains: [], sauces: [] }
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
            setActive();
            bunRef.titleRef.current.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Булки
        </Tab>
        <Tab
          active={active === "main"}
          value="main"
          onClick={() => {
            setActive();
            mainRef.titleRef.current.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Начинки
        </Tab>
        <Tab
          active={active === "sauce"}
          value="sauce"
          onClick={() => {
            setActive();
            sauceRef.titleRef.current.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Соусы
        </Tab>
      </div>
      <div className={`${styles.wrapper} scroller`}>
        <IngredientsSection title="Булки" ingredients={buns} ref={bunRef} />
        <IngredientsSection
          title="Начинки"
          ingredients={mains}
          ref={mainRef}
        />
        <IngredientsSection
          title="Соусы"
          ingredients={sauces}
          ref={sauceRef}
        />
      </div>
    </div>
  );
};

export default BurgerIngredients;
