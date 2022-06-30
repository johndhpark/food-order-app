import CartIcon from "./CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
	return (
		<div className={classes.button}>
			<CartIcon className={classes.icon} />
			Your Cart
			<span className={classes.badge}>1</span>
		</div>
	);
};

export default HeaderCartButton;
