import PropTypes from "prop-types";
import classes from "./CartItem.module.css";

const CartItem = ({ item, onRemove, onAdd }) => {
  const { price, amount, name } = item;
  const priceStr = `$${price.toFixed(2)}`;

  const removeClickHandler = () => {
    onRemove(item);
  };

  const addClickHandler = () => {
    onAdd(item);
  };

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{priceStr}</span>
          <span className={classes.amount}>x {amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={removeClickHandler}>−</button>
        <button onClick={addClickHandler}>+</button>
      </div>
    </li>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default CartItem;
