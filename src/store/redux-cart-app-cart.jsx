import { createSlice } from "@reduxjs/toolkit";



//reducers must be pure, side-effect free and synchronous
const cartSlice = createSlice({
    name: 'cart',
    initialState:{
    items:[],
    totalQuantity:0,
    changed: false// onfetching cart from server on app load we don't 
    //want to show any messages and run sendCartData action creator
    },
    reducers:{
        replaceCart(state,action){
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        },

       addItemToCart(state,action){
        const newItem = action.payload;
        const existingItem = state.items.find(item => item.id === newItem.id);
        state.totalQuantity++;
        state.changed = true;
        if(!existingItem){
            //in simple redux don't use it
            //with redux-toolkit we can use it
            state.items.push({
                id: newItem.id,
                price: newItem.price,
                quantity: 1,
                totalPrice: newItem.price,
                name: newItem.title
            });
        }else{
            existingItem.quantity++;
            existingItem.totalPrice = existingItem.totalPrice + newItem.price;

        }
       },
       removeItemFromCart(state,action){
        const id = action.payload;
        const existingItem = state.items.find(item => item.id === id);
        state.totalQuantity--;
        state.changed= true;
        if(existingItem.quantity === 1){
            state.items = state.items.filter(item => item.id !== id );
        }else{
            existingItem.quantity--; 
            existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
        }
       }
    }
});




export const cartActions = cartSlice.actions;

export default cartSlice.reducer;