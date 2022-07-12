import { useContext } from "react";
import CartContext from "../../contexts/cart-context";

import classes from "./Checkout.module.css";

const Checkout = () => {
	const ctx = useContext(CartContext);

	const formSubmitHandler = (event) => {
		event.preventDefault();
		console.log(event);
		console.log(ctx.isActive);
	};

	return (
		<form className={classes.form} onSubmit={formSubmitHandler}>
			<div className={classes.control}>
				<label htmlFor="name">Your Name</label>
				<input id="name" type="text" />
			</div>
			<div className={classes.control}>
				<label htmlFor="street">Address</label>
				<input id="street" type="text" />
			</div>
			<div className={classes.control}>
				<label htmlFor="postal">Postal Code</label>
				<input type="text" id="postal" />
			</div>
			<div className={classes.control}>
				<label htmlFor="city">City</label>
				<input id="city" type="text" />
			</div>
			<div className={classes.actions}>
				<button type="button">Cancel</button>
				<button className={classes.submit}>Confirm</button>
			</div>
		</form>
	);
};

export default Checkout;
