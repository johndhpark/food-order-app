import React from "react";
import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";

const Meals = ({ meals }) => {
  return (
    <React.Fragment>
      <MealsSummary />
      <AvailableMeals meals={meals} />
    </React.Fragment>
  );
};

export default Meals;
