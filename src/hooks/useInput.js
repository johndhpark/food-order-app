import { useReducer } from "react";

const inputReducer = (state, action) => {
	switch (action.type) {
		case "SET_INPUT":
			return { value: action.payload, touched: state.touched };
		case "BLUR":
			return { value: state.value, touched: true };
		case "SUBMIT":
			return { value: "", touched: false };
		default:
			return state;
	}
};

const useInput = (isValid) => {
	const [inputState, dispatchInputAction] = useReducer(inputReducer, {
		value: "",
		touched: false,
	});

	const inputIsValid = isValid(inputState.value);
	const inputIsInValid = !inputIsValid && inputState.touched;

	const inputChangeHandler = (event) => {
		dispatchInputAction({ type: "SET_INPUT", payload: event.target.value });
	};

	const inputBlurHandler = (event) => {
		dispatchInputAction({ type: "BLUR" });
	};

	const inputSubmitHandler = (event) => {
		dispatchInputAction({ type: "SUBMIT" });
	};

	return [
		inputState.value,
		inputState.touched,
		inputIsInValid,
		inputChangeHandler,
		inputBlurHandler,
		inputSubmitHandler,
	];
};

export default useInput;
