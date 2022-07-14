import PropTypes from "prop-types";
import React, { useCallback, useMemo, useReducer, useState } from "react";
import _ from "lodash";

const CartContext = React.createContext({
  items: [],
  cartCount: 0,
  cartTotal: 0,
  isActive: false,
  onCartClick: () => {},
  onAddItemToCart: () => {},
  onRemoveItemFromCart: () => {},
});

const INIT_STATE = {
  items: [],
  count: 0,
  total: 0,
  isActive: false,
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const newState = { ...state };

      // Find the index of the current adding item in the cart
      const idx = newState.items.findIndex(
        (item) => item.id === action.payload.id
      );

      // If the item exist in the cart already, we add it
      if (idx !== -1) {
        newState.items[idx].amount += action.payload.amount;
      } else {
        // If it doesn't exist, we just push the item into the cart
        newState.items.push(action.payload);
      }

      // Add the price of the added item to the cart total
      newState.total = _.round(
        newState.total + action.payload.price * action.payload.amount,
        2
      );
      // Increment the cart count
      newState.count += 1;

      return newState;
    }
    case "REMOVE_ITEM": {
      const newState = { ...state };
      const idx = newState.items.findIndex(
        (item) => item.id === action.payload.id
      );

      // If the item doesn't exist in the cart, we just return the new state
      if (idx === -1) return newState;

      // If there is only 1 count of that item, we removed it from the cart
      if (newState.items[idx].amount === 1) newState.items.splice(idx, 1);
      else newState.items[idx].amount -= 1; // if more than 1 item, then we just decrement count by 1

      newState.total = _.round(newState.total - action.payload.price, 2);
      newState.count -= 1;

      return newState;
    }
    case "CLEAR": {
      return { ...INIT_STATE };
    }
    default: {
      return state;
    }
  }
}

export const CartProvider = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, INIT_STATE);
  const [active, setActive] = useState(false);

  const memoizedCartClickHandler = useCallback(() => {
    setActive(!active);
  }, [active]);

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", payload: item });
  };

  const removeItemFromCartHandler = (item) => {
    dispatchCartAction({ type: "REMOVE_ITEM", payload: item });
  };

  const orderSubmitHandler = useCallback(() => {
    dispatchCartAction({ type: "CLEAR" });
    // setActive(false);
  }, []);

  const { total, items, count } = cartState;

  const cartObj = useMemo(
    () => ({
      isActive: active,
      onCartClick: memoizedCartClickHandler,
      onAddItemToCart: addItemToCartHandler,
      onRemoveItemFromCart: removeItemFromCartHandler,
      onOrderSubmit: orderSubmitHandler,
      cartTotal: total,
      items,
      cartCount: count,
    }),
    [active, memoizedCartClickHandler, orderSubmitHandler, count, items, total]
  );

  return (
    <CartContext.Provider value={cartObj}>{children}</CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default CartContext;
