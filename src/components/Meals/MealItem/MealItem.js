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
          <div className={classes.price}>{`$${price.toFixed(2)}`}</div>
        </div>
      </div>
      <div>
        <MealItemForm meal={meal} />
      </div>
    </li>
  );
};

export default MealItem;
