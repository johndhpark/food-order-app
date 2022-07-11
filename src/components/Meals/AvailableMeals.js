import { useState, useEffect } from "react";
// import PropTypes from "prop-types";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [httpError, setHttpError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      setHttpError(null);

      const res = await fetch(
        "https://react-http-3b880-default-rtdb.firebaseio.com/meals.json"
      );

      if (!res.ok || res.status !== 200) {
        throw new Error("Something went wrong!");
      }

      const data = await res.json();

      setMeals(data);
      setIsLoading(false);
    };

    fetchMeals().catch((err) => {
      setIsLoading(false);
      setHttpError(err.message);
    });
  }, []);

  const renderMeals = meals.map((meal) => (
    <MealItem key={meal.id} meal={meal} />
  ));

  if (isLoading) {
    return <p className={classes.isLoading}>Loading...</p>;
  }

  if (!isLoading && meals.length > 0) {
    return (
      <section className={classes.meals}>
        <Card>
          <ul>{renderMeals}</ul>
        </Card>
      </section>
    );
  }

  if (!isLoading && httpError) {
    return <p className={classes.error}>{httpError.toString()}</p>;
  }

  return <p className={classes.isLoading}>Found no meals</p>;
};

// AvailableMeals.propTypes = {
//   meals: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       description: PropTypes.string.isRequired,
//       price: PropTypes.number.isRequired,
//     })
//   ).isRequired,
// };

export default AvailableMeals;
