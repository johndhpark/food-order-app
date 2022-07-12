import PropTypes from "prop-types";
import { useContext, useRef, useReducer } from "react";
import CartContext from "../../contexts/cart-context";
import classes from "./Checkout.module.css";
import useInput from "../../hooks/useInput";

// const actionCreators = {
// 	name: "UPDATE_NAME",
// 	street: "UPDATE_STREET",
// 	postal: "UPDATE_POSTAL",
// 	city: "UPDATE_CITY",
// };

// const formReducer = (state, action) => {
// 	switch (action.type) {
// 		case actionCreators.name:
// 			return { ...state, name: action.payload };
// 		case actionCreators.street:
// 			return { ...state, street: action.payload };
// 		case actionCreators.postal:
// 			return { ...state, postal: action.payload };
// 		case actionCreators.city:
// 			return { ...state, city: action.payload };
// 		default:
// 			return { ...state };
// 	}
// };

const isNotEmpty = (value) => value.trim().length !== 0;
const isPostal = (value) => {
	const res = /^\d{5}(?:[- ]?\d{4})?$/.test(value);
};

const Checkout = ({ onCancelClick }) => {
	// const [formState, dispatchFormAction] = useReducer(formReducer, {
	// 	name: { value: "", touched: false },
	// 	street: { value: "", touched: false },
	// 	postal: { value: "", touched: false },
	// 	city: { value: "", touched: false },
	// });
	const [
		nameInputValue,
		nameInputTouched,
		nameInputIsInvalid,
		nameInputChangeHandler,
		nameInputBlurHandler,
		nameInputSubmitHandler,
	] = useInput(isNotEmpty);

	const [
		streetInputValue,
		streetInputTouched,
		streetInputIsInvalid,
		streetInputChangeHandler,
		streetInputBlurHandler,
		streetInputSubmitHandler,
	] = useInput(isNotEmpty);

	const [
		postalInputValue,
		postalInputTouched,
		postalInputIsInvalid,
		postalInputChangeHandler,
		postalInputBlurHandler,
		postalInputSubmitHandler,
	] = useInput(isPostal);

	const [
		cityInputValue,
		cityInputTouched,
		cityInputIsInvalid,
		cityInputChangeHandler,
		cityInputBlurHandler,
		cityInputSubmitHandler,
	] = useInput((value) => value.trim().length !== 0);

	const formIsInValid =
		nameInputIsInvalid ||
		streetInputIsInvalid ||
		postalInputIsInvalid ||
		cityInputIsInvalid;

	const formSubmitHandler = (event) => {
		event.preventDefault();

		if (formIsInValid) return;

		nameInputSubmitHandler();
		streetInputSubmitHandler();
		postalInputSubmitHandler();
		cityInputSubmitHandler();
	};

	const nameControlClasses = `${classes.control} ${
		nameInputIsInvalid ? classes.invalid : ""
	}`;

	const streetControlClasses = `${classes.control} ${
		streetInputIsInvalid ? classes.invalid : ""
	}`;

	const postalControlClasses = `${classes.control} ${
		postalInputIsInvalid ? classes.invalid : ""
	}`;

	const cityControlClasses = `${classes.control} ${
		cityInputIsInvalid ? classes.invalid : ""
	}`;

	return (
		<form className={classes.form} onSubmit={formSubmitHandler}>
			<div className={nameControlClasses}>
				<label htmlFor="name">Your Name</label>
				<input
					id="name"
					name="name"
					type="text"
					onChange={nameInputChangeHandler}
					onBlur={nameInputBlurHandler}
					value={nameInputValue}
				/>
				{nameInputIsInvalid && <p>Name cannot be empty</p>}
			</div>
			<div className={streetControlClasses}>
				<label htmlFor="street">Street</label>
				<input
					id="street"
					name="street"
					type="text"
					onChange={streetInputChangeHandler}
					onBlur={streetInputBlurHandler}
					value={streetInputValue}
				/>
				{streetInputIsInvalid && <p>Address cannot be empty</p>}
			</div>
			<div className={postalControlClasses}>
				<label htmlFor="postal">Postal Code</label>
				<input
					type="text"
					name="postal"
					id="postal"
					onChange={postalInputChangeHandler}
					onBlur={postalInputBlurHandler}
					value={postalInputValue}
				/>
				{postalInputIsInvalid && <p>Postal is invalid</p>}
			</div>
			<div className={cityControlClasses}>
				<label htmlFor="city">City</label>
				<input
					id="city"
					name="city"
					type="text"
					onChange={cityInputChangeHandler}
					onBlur={cityInputBlurHandler}
					value={cityInputValue}
				/>
				{cityInputIsInvalid && <p>City cannot be empty</p>}
			</div>
			<div className={classes.actions}>
				<button type="button" onClick={onCancelClick}>
					Cancel
				</button>
				<button className={classes.submit}>Confirm</button>
			</div>
		</form>
	);
};

Checkout.propTypes = {
	onCancelClick: PropTypes.func.isRequired,
};

export default Checkout;
