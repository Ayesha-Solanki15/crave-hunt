import React, { useReducer } from "react";
import CardContext from "./cartContext";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
    const existingCartItemsIndex = state.items.findIndex(item => item.id === action.item.id);
    const existingCartItem = state.items[existingCartItemsIndex];
    
    let updatedItems;
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem, 
        amount: existingCartItem.amount + action.item.amount
      };
      updatedItems = [ ...state.items];
      updatedItems[existingCartItemsIndex] = updatedItem;

    } else {
        updatedItems = state.items.concat(action.item);
    }
    // const updatedItems = state.items.concat(action.item);
    //unlike push method, concat add the item and returns a new array, so it ensures immutability of the original data
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }
  if( action.type === 'REMOVE') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if(existingItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id) ;
    } 
    else {
      const updatedItem = {...existingItem, amount: existingItem.amount - 1};
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }
  return defaultCartState;
};
//outside the component because it doesn't need any idea from the component and re-created each item the component is re-evaluated.

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  //dispatch method dispatch an action to the reducer function
  const addItemToCartHandler = (item) => {
    // we wanna add a new item or if it already exists then we are going to update the cart
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemToCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
  };
  return (
    <CardContext.Provider value={cartContext}>
      {props.children}
    </CardContext.Provider>
  );
};

export default CartProvider;
