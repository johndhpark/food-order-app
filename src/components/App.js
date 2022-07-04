import { Fragment, useContext } from "react";
import Cart from "./Cart/Cart";
import Header from "./Header/Header";
import Meals from "./Meals/Meals";
import CartContext from "../contexts/cart-context";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
];

const App = (props) => {
  const ctx = useContext(CartContext);

  return (
    <Fragment>
      {ctx.isActive && <Cart />}
      <Header />
      <Meals meals={DUMMY_MEALS} />
    </Fragment>
  );
};

export default App;
