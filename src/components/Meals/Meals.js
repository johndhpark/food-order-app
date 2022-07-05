import PropTypes from "prop-types";
import AvailableMeals from "./AvailableMeals";
import MealsSummary from "./MealsSummary";

const Meals = ({ meals }) => (
  <>
    <MealsSummary />
    <AvailableMeals meals={meals} />
  </>
);

Meals.propTypes = {
  meals: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Meals;
