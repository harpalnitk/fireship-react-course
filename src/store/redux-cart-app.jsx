import { configureStore } from "@reduxjs/toolkit";
import uiSliceReducer from './redux-cart-app-ui';
import cartSliceReducer from './redux-cart-app-cart';

const store = configureStore({
    reducer:{
        ui: uiSliceReducer,
        cart: cartSliceReducer

    }
});

export default store; 