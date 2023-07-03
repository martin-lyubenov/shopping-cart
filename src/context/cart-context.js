import React, { useReducer } from "react";

const CartContext = React.createContext({
  isVisibl: false,
  cartItemList: [],
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  removeItem: () => {},
  totalQuantity: 0,
  totalPrice: 0,
});

const initialState = {
  cartItemList: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "INCREASE") {
    const updatedItemList = state.cartItemList.slice();
    const updatedTotalQuantity = state.totalQuantity + 1;
    const updatedTotalPrice = state.totalPrice + action.item.price;
    const existingItemIndex = state.cartItemList.findIndex(
      (item) => item.objectId === action.item.objectId
    );
    const existingItem = state.cartItemList[existingItemIndex];

    if (!existingItem) {
      const newItem = action.item;
      newItem.quantity = 1;
      updatedItemList.push(newItem);
    } else {
      existingItem.quantity++;
      updatedItemList[existingItemIndex] = existingItem;
    }

    return {
      cartItemList: updatedItemList,
      totalQuantity: updatedTotalQuantity,
      totalPrice: updatedTotalPrice,
    };
  }

  if (action.type === "DECREASE") {
    const updatedItemList = state.cartItemList.slice();
    const updatedTotalQuantity = state.totalQuantity - 1;
    const updatedTotalPrice = state.totalPrice - action.item.price;
    const existingItemIndex = state.cartItemList.findIndex(
      (item) => item.objectId === action.item.objectId
    );
    const existingItem = state.cartItemList[existingItemIndex];

    if (!existingItem) {
      const newItem = action.item;
      newItem.quantity = 1;
      updatedItemList.push(newItem);
    } else {
      existingItem.quantity--;
      updatedItemList[existingItemIndex] = existingItem;
    }

    return {
      cartItemList: updatedItemList,
      totalQuantity: updatedTotalQuantity,
      totalPrice: updatedTotalPrice,
    };
  }

  if (action.type === "REMOVE") {
    const existingItemIndex = state.cartItemList.findIndex(
      (item) => item.objectId === action.item.objectId
    );
    const existingItem = state.cartItemList[existingItemIndex];
    const updatedTotalQuantity = state.totalQuantity - existingItem.quantity;
    const updatedTotalPrice =
      state.totalPrice - existingItem.price * existingItem.quantity;

    const updatedItemList = state.cartItemList.filter(
      (item) => item.objectId !== action.item.objectId
    );

    return {
      cartItemList: updatedItemList,
      totalQuantity: updatedTotalQuantity,
      totalPrice: updatedTotalPrice,
    };
  }

  return initialState;
};

export const CartContextProvider = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, initialState);

  const increaseQuantity = (item) => {
    dispatchCartAction({ type: "INCREASE", item });
  };

  const decreaseQuantity = (item) => {
    dispatchCartAction({ type: "DECREASE", item });
  };

  const removeItem = (item) => {
    dispatchCartAction({ type: "REMOVE", item });
  };

  const cartContext = {
    cartItemList: cartState.cartItemList,
    totalQuantity: cartState.totalQuantity,
    totalPrice: cartState.totalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartContext;
