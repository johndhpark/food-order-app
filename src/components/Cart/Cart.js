import { useContext, useState } from "react";
import CartContext from "../../contexts/cart-context";
import Card from "../UI/Card";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = () => {
	const [orderClicked, setOrderClicked] = useState(false);

	const ctx = useContext(CartContext);

	const removeItemHandler = (item) => {
		ctx.onRemoveItemFromCart({ ...item });
	};

	const addItemHandler = (item) => {
		ctx.onAddItemToCart({ ...item, amount: 1 });
	};

	const orderClickHandler = () => {
		setOrderClicked(true);
	};

	const cartItems = ctx.items.map((item) => (
		<CartItem
			key={item.id}
			item={item}
			onRemove={removeItemHandler}
			onAdd={addItemHandler}
		/>
	));

	const modalActions = (
		<div className={classes.actions}>
			<button className={classes["button--alt"]} onClick={ctx.onCartClick}>
				Close
			</button>
			<button className={classes.button} onClick={orderClickHandler}>
				Order
			</button>
		</div>
	);

	return (
		<Modal onBackdropClick={ctx.onCartClick}>
			<Card>
				<ul className={classes["cart-items"]}>{cartItems}</ul>
				<div className={classes.total}>
					<span>Total Amount</span>
					<span>{`$${ctx.cartTotal.toFixed(2)}`}</span>
				</div>
				{orderClicked && <Checkout onCancelClick={ctx.onCartClick} />}
				{!orderClicked && modalActions}
			</Card>
		</Modal>
	);
};

export default Cart;
