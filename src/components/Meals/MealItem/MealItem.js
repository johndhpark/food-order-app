import PropTypes from "prop-types";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem = ({ meal }) => {
  const { name, description, price } = meal;

  return (
    <li className={classes.meal}>
      <div>
        <div>
          <h3>{name}</h3>
          <div className={classes.description}>{description}</div>
          <div className={classes.price}>{`$${parseInt(price, 10).toFixed(
            2
          )}`}</div>
        </div>
      </div>
      <div>
        <MealItemForm meal={meal} />
      </div>
    </li>
  );
};

MealItem.propTypes = {
  meal: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default MealItem;
