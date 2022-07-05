import React, { useReducer, useState } from "react";

const CartContext = React.createContext({
  items: [],
  cartCount: 0,
  cartTotal: 0.0,
  isActive: false,
  onCartClick: () => {},
  onAddItemToCart: () => {},
  onRemoveItemFromCart: () => {},
});

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const newState = { ...state };
      const idx = newState.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (idx !== -1) newState.items[idx].amount += action.payload.amount;
      else newState.items.push(action.payload);

      newState.total += action.payload.price * action.payload.amount;
      newState.count += action.payload.amount;

      return newState;
    }
    case "REMOVE_ITEM": {
      const newState = { ...state };
      const idx = newState.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (idx === -1) return newState;

      if (newState.items[idx].amount === 1) newState.items.splice(idx, 1);
      else newState.items[idx].amount -= 1;

      newState.total = Math.abs(newState.total - action.payload.price);
      newState.count -= 1;

      return newState;
    }
    default: {
      return state;
    }
  }
}

const CartProvider = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, {
    items: [],
    count: 0,
    total: 0.0,
  });
  const [active, setActive] = useState(false);

  const cartClickHandler = () => {
    setActive(!active);
  };

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", payload: item });
  };

  const removeItemFromCartHandler = (item) => {
    dispatchCartAction({ type: "REMOVE_ITEM", payload: item });
  };

  const { total, items, count } = cartState;

  return (
    <CartContext.Provider
      value={{
        isActive: active,
        onCartClick: cartClickHandler,
        onAddItemToCart: addItemToCartHandler,
        onRemoveItemFromCart: removeItemFromCartHandler,
        cartTotal: total,
        items: items,
        cartCount: count,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext as default, CartProvider };
