import { useContext } from "react";
import CartContext from "../contexts/cart-context";
import Cart from "./Cart/Cart";
import Header from "./Header/Header";
import Meals from "./Meals/Meals";

const App = () => {
  const ctx = useContext(CartContext);

  return (
    <>
      {ctx.isActive && <Cart />}
      <Header />
      <Meals />
      <input type="text" />
      <input type="text" />
    </>
  );
};

export default App;
