import CartIcon from "./CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../contexts/cart-context";
import { useContext } from "react";

const HeaderCartButton = (props) => {
  const ctx = useContext(CartContext);

  return (
    <button className={classes.button} onClick={ctx.onCartClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      Your Cart
      <span className={classes.badge}>{ctx.cartCount}</span>
    </button>
  );
};

export default HeaderCartButton;
