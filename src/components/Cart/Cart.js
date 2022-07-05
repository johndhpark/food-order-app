import { useContext } from "react";
import CartContext from "../../contexts/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = () => {
  const ctx = useContext(CartContext);

  const removeItemHandler = (item) => {
    ctx.onRemoveItemFromCart({ ...item });
  };

  const addItemHandler = (item) => {
    ctx.onAddItemToCart({ ...item, amount: 1 });
  };

  const cartItems = ctx.items.map((item) => (
    <CartItem
      key={item.id}
      item={item}
      onRemove={removeItemHandler}
      onAdd={addItemHandler}
    />
  ));

  return (
    <Modal onBackdropClick={ctx.onCartClick}>
      <ul className={classes["cart-items"]}>{cartItems}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{`$${ctx.cartTotal.toFixed(2)}`}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={ctx.onCartClick}>
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
