import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};
//reducer function outside component because it should not be re-created
//every time component renders
const cartReducer = (state, action) => {
    if(action.type === 'ADD_CART_ITEM'){
        //concat is a JS method whic adds an item to an array
        //but returns a new array; whereas push returns same array
        //
//const updatedItems = state.items.concat(action.item);
const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id); 
const existingCartItem = state.items[existingCartItemIndex];

let updatedItems;
if(existingCartItem){

const  updatedItem = {...existingCartItem, amount: existingCartItem.amount + action.item.amount}

updatedItems = [...state.items];
updatedItems[existingCartItemIndex] = updatedItem;
} else{
  updatedItems = state.items.concat(action.item)
}
const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
return {
    items: updatedItems,
    totalAmount: updatedTotalAmount
}   

}
    if(action.type === 'REMOVE_CART_ITEM'){
      const existingCartItemIndex = state.items.findIndex(item => item.id === action.id); 
      const existingCartItem = state.items[existingCartItemIndex];
      const updatedTotalAmount = state.totalAmount - existingCartItem.price;
      let updatedItems;
      if(existingCartItem.amount === 1){
        // remove item from array
        updatedItems = state.items.filter(item => item.id !== action.id);
      }else{
        //only decrease the amount of item in the array
        const updatedItem = {...existingCartItem, amount: existingCartItem.amount - 1}
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

const CartProvider = (props) => {
  //use reducer returns array of two items and we use array destructuring
  //to store these items in two separate variables
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({
        type:'ADD_CART_ITEM',
        item: item
    });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({
        type:'REMOVE_CART_ITEM',
        id: id
    });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
