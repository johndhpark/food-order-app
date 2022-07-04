import classes from "./CartItem.module.css";

const CartItem = ({ item, onRemove, onAdd }) => {
  let { price, amount, name } = item;

  const removeClickHandler = () => {
    onRemove(item);
  };

  const addClickHandler = () => {
    onAdd(item);
  };

  price = `$${price.toFixed(2)}`;

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
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

export default CartItem;
