import React, { useReducer, useState } from "react";

const CartContext = React.createContext({
  items: [],
  isActive: false,
  onCartClick: () => {},
  onAddItemToCart: () => {},
  onRemoveItemFromCart: () => {},
});

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const newState = [...state];
      const idx = newState.findIndex((item) => item.id === action.payload.id);

      if (idx !== -1) newState[idx].count += action.payload.count;
      else newState.push(action.payload);

      return newState;
    }
    case "REMOVE_ITEM": {
      const newState = [...state];
      const idx = newState.findIndex((item) => item.id === action.payload.id);

      if (newState[idx].count === 1) newState.splice(idx, 1);
      else newState[idx] -= 1;

      return newState;
    }
    default: {
      return state;
    }
  }
}

const CartContextProvider = ({ children }) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, []);
  const [active, setActive] = useState(false);

  const cartClickHandler = () => {
    setActive(!active);
  };

  const addItemToCartHandler = (item) => {
    dispatchCart({ type: "ADD_ITEM" });
  };

  const removeItemFromCartHandler = (item) => {
    dispatchCart({ type: "REMOVE_ITEM" });
  };

  return (
    <CartContext.Provider
      value={{
        isActive: active,
        onCartClick: cartClickHandler,
        onAddItemToCart: addItemToCartHandler,
        onRemoveItemFromCart: removeItemFromCartHandler,
        items: cartState,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext as default, CartContextProvider };
