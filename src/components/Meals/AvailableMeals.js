import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = ({ meals }) => {
  const renderMeals = meals.map((meal) => (
    <MealItem key={meal.id} meal={meal} />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{renderMeals}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
