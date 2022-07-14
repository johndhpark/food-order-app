import { useContext, useState } from "react";
import CartContext from "../../contexts/cart-context";
import Card from "../UI/Card";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = () => {
	const [orderClicked, setOrderClicked] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);
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

	const orderSubmitHandler = async (customerInfo) => {
		setIsSubmitting(true);
		const { items, cartCount: count, cartTotal: total } = ctx;

		// console.log(total);

		const order = JSON.stringify({
			...customerInfo,
			count,
			total,
			items,
		});

		try {
			const res = await fetch(
				"https://react-http-3b880-default-rtdb.firebaseio.com/orders.json",
				{
					method: "POST",
					body: order,
				}
			);

			if (!res.ok) {
				throw new Error("Something went wrong");
			}

			ctx.onOrderSubmit();
		} catch (err) {
			throw new Error(err.message);
		}

		setIsSubmitting(false);
		setDidSubmit(true);
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

	const cartModalContent = (
		<>
			<ul className={classes["cart-items"]}>{cartItems}</ul>
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{`$${ctx.cartTotal.toFixed(2)}`}</span>
			</div>
			{orderClicked && (
				<Checkout
					onCancelClick={ctx.onCartClick}
					onOrderSubmit={orderSubmitHandler}
				/>
			)}
			{!orderClicked && modalActions}
		</>
	);

	const isSubmittingModalContent = <p>Sending order data...</p>;
	const didSubmitModalContent = <p>Successfully sent the order!</p>;

	return (
		<Modal onBackdropClick={ctx.onCartClick}>
			<Card>
				{!isSubmitting && !didSubmit && cartModalContent}
				{isSubmitting && isSubmittingModalContent}
				{!isSubmitting && didSubmit && didSubmitModalContent}
			</Card>
		</Modal>
	);
};

export default Cart;
