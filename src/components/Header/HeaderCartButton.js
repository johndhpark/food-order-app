import { useContext, useEffect, useState } from "react";
import CartContext from "../../contexts/cart-context";
import CartIcon from "./CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = () => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const ctx = useContext(CartContext);

  useEffect(() => {
    if (ctx.cartCount === 0) return () => {};

    setBtnIsHighlighted(true);

    const timerId = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 150);

    return () => clearTimeout(timerId);
  }, [ctx.cartCount]);

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  return (
    <button className={btnClasses} onClick={ctx.onCartClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      Your Cart
      <span className={classes.badge}>{ctx.cartCount}</span>
    </button>
  );
};

export default HeaderCartButton;
