import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Tabs.module.scss";

const Tabs = ({ items }) => {
  const [current, setCurrent] = React.useState(0);
  return (
    <div className={`${styles.wrapper} pb-10`}>
      {items.map((category, index) => (
        <Tab
          key={category}
          active={current === index}
          onClick={() => setCurrent(index)}
        >
          {category}
        </Tab>
      ))}
    </div>
  );
};

export default Tabs;
