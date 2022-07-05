import PropTypes from "prop-types";
import { useContext, useRef } from "react";
import CartContext from "../../../contexts/cart-context";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = ({ meal }) => {
  const ctx = useContext(CartContext);
  const ref = useRef();

  const submitItemHandler = (event) => {
    event.preventDefault();

    const addItem = { ...meal, amount: +ref.current.value };

    ctx.onAddItemToCart(addItem);
  };

  return (
    <form className={classes.form} onSubmit={submitItemHandler}>
      <Input
        ref={ref}
        label="Amount"
        input={{
          type: "number",
          id: `amount-${meal.id}`,
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button type="submit">+ Add</button>
    </form>
  );
};

MealItemForm.propTypes = {
  meal: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default MealItemForm;
